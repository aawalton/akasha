import { mkdirSync, renameSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  decide,
  type Held,
  heldAfter,
  NOTHING_WRITTEN,
  released,
  releasedHeld,
} from "akasha/alan/harness/code-editor/data-interfaces/state-cooldown/state-cooldown.module.code.ts"
import {
  statusBarLine,
  watchedFoldersIn,
} from "akasha/alan/harness/code-editor/data-interfaces/status-bar-composing/status-bar-composing.module.code.ts"
import {
  agentTreeLine,
  commandTreeLine,
  domainTreeLine,
  pageTreeLine,
  workTreeLine,
} from "akasha/alan/harness/code-editor/data-interfaces/tree-drawing/tree-drawing.module.code.ts"
import {
  dirsOf,
  followFolders,
  followWithin,
} from "akasha/infrastructure/services/workstations/file-following/file-following.module.code.ts"
import {
  everyOfType,
  indexNamed,
  typeSlugOf,
} from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { indexValue } from "akasha/pages/indexes/value/index-value.index.ts"
import {
  akashaRoot,
  akashaSeatsThatExist,
} from "akasha/seat-system/seat-akasha-beside/seat-akasha-beside.module.code.ts"
import { colorOfState } from "akasha/seat-system/seat-turn-color/seat-turn-color.module.code.ts"
import { seatTurnStateOf } from "akasha/seat-system/seat-turn-state/seat-turn-state.module.code.ts"
import {
  MARK_TAIL,
  marksIn,
  seatByShellPid,
  seatMarksAt,
} from "akasha/shell/terminal/terminal-seat-marks/terminal-seat-marks.module.code.ts"

const INTERFACES_AT = "alan/harness/code-editor/data-interfaces/pages"
const SCRATCH_AT = "alan/harness/code-editor/data-interfaces"
const SEAT_TYPE = "01a05035-2609-7463-ba49-ccaf20f5c337"
const SUBAGENT_TYPE = "01a05978-f2e1-78e7-9017-ab14c5c1d79b"
const TURN_STATE_TYPE = "01a06924-e882-736f-8cac-465ef2b5d799"
const INITIATIVE_TYPE = "01a04e58-5735-72b4-b945-56366461c776"
const SIDECAR = ".uncommitted.ts"
const STATE_TAIL = ".code-editor-data-interface.state.uncommitted.json"
const SETTLE_MS = 25

type Picture = {
  readonly cooldownMs: number
  readonly folders: readonly string[]
  readonly holds: (at: string) => boolean
  readonly movesWithIndex?: boolean
  readonly line: () => string | null
  held: Held
  waking: ReturnType<typeof setTimeout> | null
}

function stateFileFor(root: string, slug: string): string {
  return join(root, INTERFACES_AT, slug, `${slug}${STATE_TAIL}`)
}

function writeLine(root: string, slug: string, line: string): undefined {
  const scratch = join(root, SCRATCH_AT, `${slug}${STATE_TAIL}.${process.pid}.part`)
  writeFileSync(scratch, `${line}\n`, "utf8")
  renameSync(scratch, stateFileFor(root, slug))
  return undefined
}

function within(folder: string, ...endings: readonly string[]): (at: string) => boolean {
  return (at) => dirname(at) === folder && endings.some((ending) => at.endsWith(ending))
}

function pagesOfType(root: string, pageType: string): readonly string[] {
  return everyOfType(root, typeSlugOf(root, pageType)).map((one) => join(root, one.path))
}

function foldersOf(pages: readonly string[]): readonly string[] {
  return [...dirsOf(pages)].sort()
}

function oneOf(pages: readonly string[]): (at: string) => boolean {
  const held = new Set(pages)
  return (at) => held.has(at)
}

function either(...tests: readonly ((at: string) => boolean)[]): (at: string) => boolean {
  return (at) => tests.some((test) => test(at))
}

function endingWithin(folders: readonly string[], ending: string): (at: string) => boolean {
  const held = new Set(folders)
  return (at) => held.has(dirname(at)) && at.endsWith(ending)
}

function terminalTabsLine(root: string): string | null {
  const marks = marksIn(seatMarksAt(root))
  if (marks === null) {
    return null
  }
  const seatByPid: Record<string, string> = {}
  const seatNames = new Set(akashaSeatsThatExist().values())
  for (const [pid, seat] of seatByShellPid(marks, seatNames)) seatByPid[String(pid)] = seat
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

export function picturesOf(root: string): ReadonlyMap<string, Picture> {
  const seatPages = pagesOfType(root, SEAT_TYPE)
  const seatFolders = foldersOf(seatPages)
  const seatFiles = either(oneOf(seatPages), endingWithin(seatFolders, SIDECAR))
  const turnStatePages = pagesOfType(root, TURN_STATE_TYPE)
  const turnStateFolders = foldersOf(turnStatePages)
  const subagentPages = pagesOfType(root, SUBAGENT_TYPE)
  const subagentFolders = foldersOf(subagentPages)
  const initiativePages = pagesOfType(root, INITIATIVE_TYPE)
  const initiativeFolders = foldersOf(initiativePages)
  const terminals = seatMarksAt(root)
  const readings = watchedFoldersIn(root)
  return new Map<string, Picture>([
    [
      "agent-tree",
      {
        cooldownMs: 1_000,
        folders: [...seatFolders, ...turnStateFolders, ...subagentFolders],
        holds: either(seatFiles, oneOf(turnStatePages), oneOf(subagentPages)),
        movesWithIndex: true,
        line: () => agentTreeLine(root),
        held: NOTHING_WRITTEN,
        waking: null,
      },
    ],
    [
      "status-bar",
      {
        cooldownMs: 1_000,
        folders: readings,
        holds: endingWithin(readings, SIDECAR),
        line: () => statusBarLine(root),
        held: NOTHING_WRITTEN,
        waking: null,
      },
    ],
    [
      "work-tree",
      {
        cooldownMs: 1_000,
        folders: [...seatFolders, ...turnStateFolders, ...initiativeFolders],
        holds: either(seatFiles, oneOf(turnStatePages), oneOf(initiativePages)),
        movesWithIndex: true,
        line: () => workTreeLine(root),
        held: NOTHING_WRITTEN,
        waking: null,
      },
    ],
    [
      "domain-tree",
      {
        cooldownMs: 1_000,
        folders: [],
        holds: () => false,
        movesWithIndex: true,
        line: () => domainTreeLine(root),
        held: NOTHING_WRITTEN,
        waking: null,
      },
    ],
    [
      "page-tree",
      {
        cooldownMs: 1_000,
        folders: [],
        holds: () => false,
        movesWithIndex: true,
        line: () => pageTreeLine(root),
        held: NOTHING_WRITTEN,
        waking: null,
      },
    ],
    [
      "command-tree",
      {
        cooldownMs: 1_000,
        folders: [],
        holds: () => false,
        movesWithIndex: true,
        line: () => commandTreeLine(root),
        held: NOTHING_WRITTEN,
        waking: null,
      },
    ],
    [
      "terminal-tabs",
      {
        cooldownMs: 1_000,
        folders: [...seatFolders, ...turnStateFolders, terminals],
        holds: either(seatFiles, oneOf(turnStatePages), within(terminals, MARK_TAIL)),
        line: () => terminalTabsLine(root),
        held: NOTHING_WRITTEN,
        waking: null,
      },
    ],
  ])
}

function keep(root: string, slug: string, picture: Picture): undefined {
  const line = picture.line()
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
  mkdirSync(seatMarksAt(root), { recursive: true })
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
  const indexed = followFolders(
    new Set([join(root, indexNamed(), indexValue.name)]),
    () => {
      for (const [slug, picture] of pictures) {
        if (picture.movesWithIndex === true) keep(root, slug, picture)
      }
    },
    SETTLE_MS
  )
  return () => {
    following.stop()
    indexed.stop()
    return undefined
  }
}

if (import.meta.main) {
  watchEditorData()
}
