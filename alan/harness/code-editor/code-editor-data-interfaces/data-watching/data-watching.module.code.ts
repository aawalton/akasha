// WHAT EACH PART OF THE EDITOR DRAWS, HELD IN MEMORY AND WRITTEN WHERE THAT PART READS IT.
//
// The editor's host is node and holds no transpiler, so it cannot open a page; and a read that
// starts a child pays bun's startup, near 0.19s, on every repaint. So the reading happens here,
// once, and the editor reads one small file per part.
//
// A throw is left to end the process. A loop that catches its own throw and logs it leaves systemd
// reading `active (running)` while the work has stopped, which `surplus-fall-notifier` did for nine
// days.

import { renameSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { akashaRoot, akashaSeatsThatExist } from "@akasha/seat-system/seat-akasha-beside"
import { colorOfState } from "@akasha/seat-system/seat-turn-color"
import { SEAT_TURN_STATES, seatTurnStateOf } from "@akasha/seat-system/seat-turn-state"
import { followWithin } from "@akasha/service-system/file-following"
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

// One picture, the folders it is made from, and the cooldown it is written under. `holds` answers
// whether a file is one this picture reads, so a change reaches only the pictures it can move.
type Picture = {
  readonly cooldownMs: number
  readonly folders: readonly string[]
  readonly holds: (at: string) => boolean
  readonly line: () => string
  held: Held
  waking: ReturnType<typeof setTimeout> | null
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

// A file is one of a folder's own where it sits directly in that folder and its name ends one of
// these ways. The folder is compared rather than prefixed, so a deeper folder is not taken for it.
function within(folder: string, ...endings: readonly string[]): (at: string) => boolean {
  return (at) => dirname(at) === folder && endings.some((ending) => at.endsWith(ending))
}

function either(...tests: readonly ((at: string) => boolean)[]): (at: string) => boolean {
  return (at) => tests.some((test) => test(at))
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

export function picturesOf(root: string): ReadonlyMap<string, Picture> {
  const seats = join(root, SEATS_AT)
  const turnStates = join(root, TURN_STATES_AT)
  return new Map<string, Picture>([
    [
      "agent-colors",
      {
        cooldownMs: 100,
        folders: [seats, turnStates],
        holds: either(
          within(seats, SIDECAR, ".seat.ts"),
          within(turnStates, ".seat-turn-state.ts")
        ),
        line: agentColorsLine,
        held: NOTHING_WRITTEN,
        waking: null,
      },
    ],
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
  const pictures = picturesOf(root)
  const folders = new Set<string>()
  for (const picture of pictures.values()) for (const at of picture.folders) folders.add(at)
  const holds = either(...[...pictures.values()].map((picture) => picture.holds))
  for (const [slug, picture] of pictures) keep(root, slug, picture)
  const following = followWithin(
    folders,
    holds,
    (what) => {
      for (const [slug, picture] of pictures) {
        if (what.some(picture.holds)) keep(root, slug, picture)
      }
    },
    SETTLE_MS
  )
  return following.stop
}

if (import.meta.main) {
  watchEditorData()
}
