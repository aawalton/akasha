import { mkdirSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  akashaRoot,
  akashaSeatsThatExist,
} from "akasha/agent/seat/modules/akasha-beside/seat-akasha-beside.module.code.ts"
import { colorOfState } from "akasha/agent/seat/observation/seat-turn/modules/color/seat-turn-color.module.code.ts"
import { seatTurnStateOf } from "akasha/agent/seat/observation/seat-turn/modules/state/seat-turn-state.module.code.ts"
import {
  decide,
  type Held,
  heldAfter,
  NOTHING_WRITTEN,
  released,
  releasedHeld,
} from "akasha/alan/harness/code-editor/data-interface/modules/state-cooldown/state-cooldown.module.code.ts"
import { writeState } from "akasha/alan/harness/code-editor/data-interface/modules/state-writing/state-writing.module.code.ts"
import {
  statusBarLine,
  watchedFoldersIn,
} from "akasha/alan/harness/code-editor/data-interface/modules/status-bar-composing/status-bar-composing.module.code.ts"
import {
  agentTreeLine,
  serviceTreeLine,
  workTreeLine,
} from "akasha/alan/harness/code-editor/data-interface/modules/tree-drawing/tree-drawing.module.code.ts"
import {
  MARK_TAIL,
  marksIn,
  seatByShellPid,
  seatMarksAt,
} from "akasha/code/shell/terminal/modules/terminal-seat-marks/terminal-seat-marks.module.code.ts"
import { leftWhereCodeMoved } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/code-moving/code-moving.module.code.ts"
import {
  dirsOf,
  type Following,
  followFolders,
  followWithin,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/file-following/file-following.module.code.ts"
import {
  everyOfType,
  slugFoldersOf,
  typeSlugOf,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { pagesAtFor } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import { kindsUnder } from "akasha/page/type/modules/descent/page-type-descent.module.code.ts"
import "akasha/alan/harness/code-editor/data-interface/pages/terminal-tabs/terminal-tabs.code-editor-data-interface.d.ts"

const SEAT_TYPE = "01a05035-2609-7463-ba49-ccaf20f5c337"
const SUBAGENT_TYPE = "01a05978-f2e1-78e7-9017-ab14c5c1d79b"
const TURN_STATE_TYPE = "01a06924-e882-736f-8cac-465ef2b5d799"
const INITIATIVE_TYPE = "01a04e58-5735-72b4-b945-56366461c776"
const SERVICE = "service"
const SIDECAR = ".uncommitted.ts"
const SETTLE_MS = 25

const REACH = 1

type Picture = {
  readonly cooldownMs: number
  readonly folders: readonly string[]
  readonly reaches: readonly string[]
  readonly holds: (at: string) => boolean
  readonly identities: readonly string[]
  readonly line: () => string | null
  held: Held
  waking: ReturnType<typeof setTimeout> | null
}

function within(folder: string, ...endings: readonly string[]): (at: string) => boolean {
  return (at) => dirname(at) === folder && endings.some((ending) => at.endsWith(ending))
}

function pagesOfType(root: string, pageTypeSlug: string): readonly string[] {
  return everyOfType(root, pageTypeSlug).map((one) => join(root, one.path))
}

function pagesFolderOf(root: string, pageTypeSlug: string): string {
  return join(root, pagesAtFor(root, pageTypeSlug))
}

function reached(folder: string, ...endings: readonly string[]): (at: string) => boolean {
  return (at) => {
    const dir = dirname(at)
    const near = dir === folder || dirname(dir) === folder
    return near && endings.some((ending) => at.endsWith(ending))
  }
}

function pageEnding(pageTypeSlug: string): string {
  return `.${pageTypeSlug}.ts`
}

function serviceTypes(root: string): readonly string[] {
  return [...kindsUnder(SERVICE, root)].filter((one) => one !== SERVICE)
}

function pagesOfTypes(root: string, pageTypeSlugs: readonly string[]): readonly string[] {
  return pageTypeSlugs.flatMap((one) => pagesOfType(root, one))
}

function identitiesOf(root: string, pageTypeSlugs: readonly string[]): readonly string[] {
  const found = new Set<string>()
  for (const one of pageTypeSlugs) {
    for (const at of slugFoldersOf(root, one)) found.add(join(root, at))
  }
  return [...found].sort()
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
  const seatType = typeSlugOf(root, SEAT_TYPE)
  const turnStateType = typeSlugOf(root, TURN_STATE_TYPE)
  const subagentType = typeSlugOf(root, SUBAGENT_TYPE)
  const initiativeType = typeSlugOf(root, INITIATIVE_TYPE)
  const serviceKinds = serviceTypes(root)
  const seatPages = pagesFolderOf(root, seatType)
  const seatFiles = reached(seatPages, pageEnding(seatType), SIDECAR)
  const turnStatePages = pagesOfType(root, turnStateType)
  const turnStateFolders = foldersOf(turnStatePages)
  const subagentPages = pagesFolderOf(root, subagentType)
  const subagentFiles = reached(subagentPages, pageEnding(subagentType))
  const initiativePages = pagesFolderOf(root, initiativeType)
  const initiativeFiles = reached(initiativePages, pageEnding(initiativeType))
  const serviceFolders = foldersOf(pagesOfTypes(root, serviceKinds))
  const terminals = seatMarksAt(root)
  const readings = watchedFoldersIn(root)
  return new Map<string, Picture>([
    [
      "agent-tree",
      {
        cooldownMs: 1_000,
        folders: turnStateFolders,
        reaches: [seatPages, subagentPages],
        holds: either(seatFiles, oneOf(turnStatePages), subagentFiles),
        identities: identitiesOf(root, [seatType, turnStateType, subagentType]),
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
        reaches: [],
        holds: endingWithin(readings, SIDECAR),
        identities: [],
        line: () => statusBarLine(root),
        held: NOTHING_WRITTEN,
        waking: null,
      },
    ],
    [
      "work-tree",
      {
        cooldownMs: 1_000,
        folders: turnStateFolders,
        reaches: [seatPages, initiativePages],
        holds: either(seatFiles, oneOf(turnStatePages), initiativeFiles),
        identities: identitiesOf(root, [seatType, turnStateType, initiativeType]),
        line: () => workTreeLine(root),
        held: NOTHING_WRITTEN,
        waking: null,
      },
    ],
    [
      "service-tree",
      {
        cooldownMs: 1_000,
        folders: serviceFolders,
        reaches: [],
        holds: endingWithin(serviceFolders, SIDECAR),
        identities: identitiesOf(root, serviceKinds),
        line: () => serviceTreeLine(root),
        held: NOTHING_WRITTEN,
        waking: null,
      },
    ],
    [
      "terminal-tabs",
      {
        cooldownMs: 1_000,
        folders: [...turnStateFolders, terminals],
        reaches: [seatPages],
        holds: either(seatFiles, oneOf(turnStatePages), within(terminals, MARK_TAIL)),
        identities: [],
        line: () => terminalTabsLine(root),
        held: NOTHING_WRITTEN,
        waking: null,
      },
    ],
  ])
}

function landed(root: string, slug: string, line: string): undefined {
  writeState(root, slug, line)
  leftWhereCodeMoved()
  return undefined
}

function keep(root: string, slug: string, picture: Picture): undefined {
  const line = picture.line()
  if (line === null) {
    return undefined
  }
  const now = Date.now()
  const decision = decide(picture.held, line, now, picture.cooldownMs)
  picture.held = heldAfter(picture.held, decision, line, now)
  if (decision.act === "write") return landed(root, slug, decision.line)
  if (decision.act !== "hold" || picture.waking !== null) return undefined
  picture.waking = setTimeout(
    () => {
      picture.waking = null
      const at = Date.now()
      const owed = released(picture.held, at)
      picture.held = releasedHeld(picture.held, owed, at)
      if (owed.act === "write") landed(root, slug, owed.line)
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
  const reaches = new Set<string>()
  for (const picture of pictures.values()) {
    for (const at of picture.folders) folders.add(at)
    for (const at of picture.reaches) reaches.add(at)
  }
  const holds = either(...[...pictures.values()].map((picture) => picture.holds))
  for (const [slug, picture] of pictures) keep(root, slug, picture)
  const moved = (what: readonly string[]): undefined => {
    for (const [slug, picture] of pictures) {
      if (what.some(picture.holds)) keep(root, slug, picture)
    }
  }
  const following: Following[] = [
    followWithin(folders, holds, moved, SETTLE_MS),
    followWithin(reaches, holds, moved, SETTLE_MS, undefined, REACH),
  ]
  for (const [slug, picture] of pictures) {
    if (picture.identities.length === 0) continue
    following.push(
      followFolders(new Set(picture.identities), () => keep(root, slug, picture), SETTLE_MS)
    )
  }
  return () => {
    for (const one of following) one.stop()
    return undefined
  }
}

if (import.meta.main) {
  watchEditorData()
}
