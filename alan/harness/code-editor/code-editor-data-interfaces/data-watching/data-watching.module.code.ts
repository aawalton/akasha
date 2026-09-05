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
import { agentTreeLine, statusBarLine } from "../beat-drawing/beat-drawing.module.code.ts"
import {
  decide,
  type Held,
  heldAfter,
  NOTHING_WRITTEN,
  released,
  releasedHeld,
} from "../state-cooldown/state-cooldown.module.code.ts"
import {
  seatByShellPid,
  tmuxClients,
} from "../terminal-seat-mapping/terminal-seat-mapping.module.code.ts"
import {
  domainTreeLine,
  pageTreeLine,
  workTreeLine,
} from "../tree-drawing/tree-drawing.module.code.ts"

const INTERFACES_AT = "alan/harness/code-editor/code-editor-data-interfaces/pages"
// The scratch file is written one folder above the folder the editor watches, so the only event
// that folder raises is the rename putting a finished line in place. Written beside the file it
// replaces, the scratch raised events of its own: four per write under node, and under bun the
// scratch is reported and the rename never is, which left the reading untestable.
const SCRATCH_AT = "alan/harness/code-editor/code-editor-data-interfaces"
const SEATS_AT = "seat-system/seats/pages"
const TURN_STATES_AT = "seat-system/seat-turn-states/pages"
// Every tree is read out of the akasha index, and the index says it moved by one small file.
// Watching that beats watching every source file: the editor watched `**/*.ts`, 42 writes a
// minute of which 11 in 318 could move a row.
const INDEX_AT = ".git/data/index"
const INDEX_STAMP = "stamp.jsonl"
const SIDECAR = ".uncommitted.ts"
const STATE_TAIL = ".code-editor-data-interface.state.uncommitted.jsonl"
const SETTLE_MS = 25
const TABS_EVERY_MS = 1_000
const FLEET_EVERY_MS = 1_000
const STATUS_EVERY_MS = 30_000

// One picture, the folders it is made from, and the cooldown it is written under. `holds` answers
// whether a file is one this picture reads, so a change reaches only the pictures it can move.
type Picture = {
  readonly cooldownMs: number
  readonly folders: readonly string[]
  readonly holds: (at: string) => boolean
  readonly line: () => string | null
  readonly refresh?: () => Promise<undefined>
  readonly everyMs?: number
  held: Held
  waking: ReturnType<typeof setTimeout> | null
}

function stateFileFor(root: string, slug: string): string {
  return join(root, INTERFACES_AT, `${slug}${STATE_TAIL}`)
}

// A rename rather than a write in place, so the editor never reads half a line. The scratch name
// carries this process's id, so two services writing at once never take one another's file.
function writeLine(root: string, slug: string, line: string): undefined {
  const scratch = join(root, SCRATCH_AT, `${slug}${STATE_TAIL}.${process.pid}.part`)
  writeFileSync(scratch, `${line}\n`, "utf8")
  renameSync(scratch, stateFileFor(root, slug))
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

// What a terminal sits on cannot be watched for: no file changes when a client attaches, so this
// one picture is taken on a beat. The beat is what costs; the file moves only where the map does.
//
// NOTHING IS HELD UNTIL THE FIRST BEAT HAS RUN. A picture seeded with an empty value is a picture
// that can be written before it has ever been read: the watching is set up while the first beat is
// still in flight, so a seat file changing in that window wrote the seed over the last good line
// and took every tab's color away until the beat landed.
let tabsHeld: ReadonlyMap<number, string> | null = null

async function refreshTerminalTabs(): Promise<undefined> {
  tabsHeld = seatByShellPid(await tmuxClients(), new Set(akashaSeatsThatExist().values()))
  return undefined
}

function terminalTabsLine(): string | null {
  if (tabsHeld === null) {
    return null
  }
  const seatByPid: Record<string, string> = {}
  for (const [pid, seat] of tabsHeld) seatByPid[String(pid)] = seat
  const colorBySeat: Record<string, string> = {}
  for (const [agentId, name] of akashaSeatsThatExist()) {
    const color = colorOfState(seatTurnStateOf(agentId).state)
    if (color !== null) colorBySeat[name] = color
  }
  return JSON.stringify({
    seatByShellPid: seatByPid,
    colorBySeat,
  } satisfies TerminalTabsState)
}

let fleetHeld: string | null = null

async function refreshAgentTree(): Promise<undefined> {
  fleetHeld = await agentTreeLine()
  return undefined
}

let statusHeld: string | null = null

async function refreshStatusBar(): Promise<undefined> {
  statusHeld = await statusBarLine()
  return undefined
}

export function picturesOf(root: string): ReadonlyMap<string, Picture> {
  const seats = join(root, SEATS_AT)
  const turnStates = join(root, TURN_STATES_AT)
  const index = join(root, INDEX_AT)
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
    [
      "agent-tree",
      {
        cooldownMs: 1_000,
        folders: [seats],
        holds: within(seats, SIDECAR, ".seat.ts"),
        line: () => fleetHeld,
        refresh: refreshAgentTree,
        everyMs: FLEET_EVERY_MS,
        held: NOTHING_WRITTEN,
        waking: null,
      },
    ],
    [
      "status-bar",
      {
        cooldownMs: 1_000,
        folders: [],
        holds: () => false,
        line: () => statusHeld,
        refresh: refreshStatusBar,
        everyMs: STATUS_EVERY_MS,
        held: NOTHING_WRITTEN,
        waking: null,
      },
    ],
    [
      "work-tree",
      {
        cooldownMs: 1_000,
        folders: [index, seats, turnStates],
        holds: either(
          within(index, INDEX_STAMP),
          within(seats, SIDECAR, ".seat.ts"),
          within(turnStates, ".seat-turn-state.ts")
        ),
        line: () => workTreeLine(root),
        held: NOTHING_WRITTEN,
        waking: null,
      },
    ],
    [
      "domain-tree",
      {
        cooldownMs: 1_000,
        folders: [index],
        holds: within(index, INDEX_STAMP),
        line: () => domainTreeLine(root),
        held: NOTHING_WRITTEN,
        waking: null,
      },
    ],
    [
      "page-tree",
      {
        cooldownMs: 1_000,
        folders: [index],
        holds: within(index, INDEX_STAMP),
        line: () => pageTreeLine(root),
        held: NOTHING_WRITTEN,
        waking: null,
      },
    ],
    [
      "terminal-tabs",
      {
        cooldownMs: 1_000,
        folders: [seats, turnStates],
        holds: either(
          within(seats, SIDECAR, ".seat.ts"),
          within(turnStates, ".seat-turn-state.ts")
        ),
        line: terminalTabsLine,
        refresh: refreshTerminalTabs,
        everyMs: TABS_EVERY_MS,
        held: NOTHING_WRITTEN,
        waking: null,
      },
    ],
  ])
}

function keep(root: string, slug: string, picture: Picture): undefined {
  const line = picture.line()
  // A PICTURE READ BY NOTHING YET IS WRITTEN BY NOTHING YET. The file already on disk is the last
  // good line the editor is drawing, and leaving it there is what keeps that line on the screen.
  if (line === null) {
    return undefined
  }
  const now = Date.now()
  const decision = decide(picture.held, line, now, picture.cooldownMs)
  picture.held = heldAfter(picture.held, decision, line, now)
  if (decision.act === "write") {
    writeLine(root, slug, decision.line)
    return undefined
  }
  if (decision.act !== "hold" || picture.waking !== null) return undefined
  picture.waking = setTimeout(
    () => {
      picture.waking = null
      const at = Date.now()
      const owed = released(picture.held, at)
      picture.held = releasedHeld(picture.held, owed, at)
      if (owed.act === "write") writeLine(root, slug, owed.line)
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
  const beats: ReturnType<typeof setInterval>[] = []
  for (const [slug, picture] of pictures) {
    const refresh = picture.refresh
    if (refresh === undefined || picture.everyMs === undefined) {
      keep(root, slug, picture)
      continue
    }
    // A throw inside a beat is left to end the process, as a throw anywhere here is. A beat still
    // running when the next falls due is left to finish rather than joined by a second of itself,
    // because the fleet read is slower than its own beat when the fleet is busy.
    let beating = false
    const beat = async (): Promise<undefined> => {
      if (beating) return undefined
      beating = true
      try {
        await refresh()
        keep(root, slug, picture)
      } finally {
        beating = false
      }
      return undefined
    }
    void beat()
    beats.push(setInterval(() => void beat(), picture.everyMs))
  }
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
  return () => {
    for (const beat of beats) clearInterval(beat)
    following.stop()
    return undefined
  }
}

if (import.meta.main) {
  watchEditorData()
}
