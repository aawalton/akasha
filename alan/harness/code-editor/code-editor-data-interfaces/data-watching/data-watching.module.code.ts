// WHAT EACH PART OF THE EDITOR DRAWS, HELD IN MEMORY AND WRITTEN WHERE THAT PART READS IT.
//
// The editor's host is node and holds no transpiler, so it cannot open a page; and a read that
// starts a child pays bun's startup, near 0.19s, on every repaint. So the reading happens here,
// once, and the editor reads one small file per part.
//
// A throw is left to end the process. A loop that catches its own throw and logs it leaves systemd
// reading `active (running)` while the work has stopped, which `surplus-fall-notifier` did for nine
// days.

import { readdirSync, renameSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { akashaRoot, akashaSeatsThatExist } from "@akasha/seat-system/seat-akasha-beside"
import { colorOfState } from "@akasha/seat-system/seat-turn-color"
import { SEAT_TURN_STATES, seatTurnStateOf } from "@akasha/seat-system/seat-turn-state"
import { followFiles } from "@akasha/service-system/file-following"
import {
  decide,
  type Held,
  heldAfter,
  NOTHING_WRITTEN,
  released,
  releasedHeld,
} from "../state-cooldown/state-cooldown.module.code.ts"

const INTERFACES_AT = "alan/harness/code-editor/code-editor-data-interfaces/pages"
const SEATS_AT = "seat-system/seats/pages"
const TURN_STATES_AT = "seat-system/seat-turn-states/pages"
const SIDECAR = ".uncommitted.ts"
const STATE_TAIL = ".code-editor-data-interface.state.uncommitted.jsonl"
const SETTLE_MS = 25

// One picture and the cooldown it is written under.
type Picture = {
  readonly cooldownMs: number
  held: Held
  waking: ReturnType<typeof setTimeout> | null
  line: () => string
}

function stateFileFor(root: string, slug: string): string {
  return join(root, INTERFACES_AT, `${slug}${STATE_TAIL}`)
}

// A rename rather than a write in place, so the editor never reads half a line. The scratch name
// carries this process's id and ends `.part`, which the editor's `*.uncommitted.jsonl` watcher
// does not match, so the scratch file wakes nobody.
function writeLine(at: string, line: string): undefined {
  const scratch = `${at}.${process.pid}.part`
  writeFileSync(scratch, `${line}\n`, "utf8")
  renameSync(scratch, at)
  return undefined
}

function agentColorsLine(): string {
  const byAgent: Record<string, string> = {}
  for (const [agentId] of akashaSeatsThatExist()) {
    const color = colorOfState(seatTurnStateOf(agentId).state)
    if (color !== null) byAgent[agentId] = color
  }
  const byState: Record<string, string> = {}
  for (const state of SEAT_TURN_STATES) {
    const color = colorOfState(state)
    if (color !== null) byState[state] = color
  }
  return JSON.stringify({ byAgent, byState } satisfies AgentColorsState)
}

function filesUnder(root: string, where: string, ending: string): readonly string[] {
  const at = join(root, where)
  return readdirSync(at)
    .filter((name) => name.endsWith(ending))
    .map((name) => join(at, name))
}

export function watchedFiles(root: string): ReadonlySet<string> {
  return new Set([
    ...filesUnder(root, SEATS_AT, SIDECAR),
    ...filesUnder(root, SEATS_AT, ".seat.ts"),
    ...filesUnder(root, TURN_STATES_AT, ".seat-turn-state.ts"),
  ])
}

function keep(root: string, slug: string, picture: Picture): undefined {
  const line = picture.line()
  const now = Date.now()
  const decision = decide(picture.held, line, now, picture.cooldownMs)
  picture.held = heldAfter(picture.held, decision, line, now)
  if (decision.act === "write") {
    writeLine(stateFileFor(root, slug), decision.line)
    return undefined
  }
  if (decision.act !== "hold" || picture.waking !== null) return undefined
  picture.waking = setTimeout(
    () => {
      picture.waking = null
      const at = Date.now()
      const owed = released(picture.held, at)
      picture.held = releasedHeld(picture.held, owed, at)
      if (owed.act === "write") writeLine(stateFileFor(root, slug), owed.line)
    },
    Math.max(0, decision.untilMs - now)
  )
  return undefined
}

export function watchEditorData(): () => undefined {
  const root = akashaRoot()
  const pictures = new Map<string, Picture>([
    [
      "agent-colors",
      { cooldownMs: 100, held: NOTHING_WRITTEN, waking: null, line: agentColorsLine },
    ],
  ])
  for (const [slug, picture] of pictures) keep(root, slug, picture)
  const following = followFiles(
    watchedFiles(root),
    () => {
      for (const [slug, picture] of pictures) keep(root, slug, picture)
    },
    SETTLE_MS
  )
  return following.stop
}

if (import.meta.main) {
  watchEditorData()
}
