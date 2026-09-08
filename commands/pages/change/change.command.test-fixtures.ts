import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { idOf, indexedRepo, NAMER_CODE, NAMER_PAGE, pageOf } from "@akasha/indexes/indexing/testing"
import { removePage } from "../../../changes/agent/file/remove-page/remove-page.change-checked.code.ts"
import { pathsOf } from "../../../changes/modules/change-answer/change-answer.module.code.ts"
import type { Stated } from "../../../changes/modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../changes/modules/change-shadow/change-shadow.module.code.ts"
import {
  appendEdits,
  editsIn,
  keptEdits,
} from "../../../changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { handedPageOf } from "../../../changes/modules/subagent-handed/subagent-handed.module.code.ts"
import {
  type Loaded,
  loadedAt,
} from "../../../changes/runners/pages/change-running/change-running.change-runner.code.ts"
import type { Answer } from "../../../command-system/calling/calling.module.code.ts"
import type { Piping } from "../../../command-system/piping/piping.module.code.ts"
import { type Applying, changing, type Over } from "./change.command.code.ts"

export const PAGE = "akasha/seat-system/seats/pages/tester.seat.ts"

export const MISSING = "akasha/one/missing.module.ts"

export const SPARE_PAGE = "akasha/three/spare.module.ts"

export const SPARE_CODE = "akasha/three/spare.module.code.ts"

const SPARE: Readonly<Record<string, string>> = {
  [SPARE_PAGE]: pageOf({
    id: idOf("d"),
    pageTypeSlug: "module",
    slug: "spare",
    definition: "a page importing the page held",
    code: "ts",
  }),
  [SPARE_CODE]: 'import { kept } from "../one/held.module.code.ts"\n\nexport const spare = kept\n',
}

let given: Readonly<Record<string, string>> = {}

export function givenIn(): Readonly<Record<string, string>> {
  return given
}

const REMOVE_PAGE: Loaded = {
  run: (world, said) => {
    given = said as Readonly<Record<string, string>>
    return removePage(world, said as { at: string })
  },
  guards: [],
}

const REMOVE_PAGE_AT = "akasha/changes/remove-page.change-checked.ts"

const OWING_NO_READING: Readonly<Record<string, string>> = {
  [REMOVE_PAGE_AT]: pageOf({
    id: "01a04a4a-0001-7000-8000-000000000006",
    pageTypeSlug: "change-checked",
    slug: "remove-page",
    definition: "a mechanical change an indexed repository carries",
    code: "ts",
    writerOwesReading: false,
  }),
}

export function repo(): string {
  return indexedRepo({ ...SPARE, ...OWING_NO_READING })
}

export function piping(said: string): Piping {
  return () => ({ bytes: new TextEncoder().encode(said) })
}

export const NOTHING: Piping = () => ({ bytes: new Uint8Array(0) })

export const APPLIED: (string | null)[] = []

export const applying: Applying = async (message) => {
  APPLIED.push(message)
  return { report: [`applied ${message ?? "what the apply composes"}`], refusals: [], code: 0 }
}

const refusingApply: Applying = async () => ({
  report: [],
  refusals: ["the checks refused the landing"],
  code: 3,
})

export async function refusedApply(root: string, at: string): Promise<Answer> {
  return await changing(
    root,
    PAGE,
    null,
    ["remove-page"],
    piping(taking(at)),
    loading,
    refusingApply
  )
}

export function taking(path: string): string {
  return `at: ${path}\n`
}

export function asking(path: string, message: string): string {
  return `${taking(path)}apply: ${message}\n`
}

export async function loading(world: World, at: string): Promise<Loaded | string> {
  if (at === "change-checked/remove-page") return REMOVE_PAGE
  return await loadedAt(world, at)
}

export function pathsIn(root: string): readonly string[] {
  const said = editsIn(root, PAGE)
  return "why" in said ? [] : said.rows.flatMap(pathsOf)
}

export const SUB = "tester-one"

export function handing(root: string, under: string, rows: readonly Stated[]): undefined {
  keptEdits(root, handedPageOf(under), () => rows)
}

export const HANDED_AT = "akasha/three/handed.md"

export const HANDED_OTHER = "akasha/three/other.md"

export const HANDED_ONE: Stated = { kind: "add", path: HANDED_AT, content: "handed" }

const HANDED_TWO: Stated = { kind: "add", path: HANDED_OTHER, content: "other" }

export const SUB_SAID = "tester-one handed 1 edit(s) over"

export const TAKEN_SAID: readonly string[] = [
  `adds ${HANDED_AT}`,
  "these edits are this agent's own now, and `akasha apply` lands them",
]

export const FORGOT_SAID: readonly string[] = [
  `adds ${HANDED_AT}`,
  "these edits are gone, and no apply lands them",
]

export function handedTwice(root: string): string {
  handing(root, SUB, [HANDED_ONE])
  handing(root, "tester-two", [HANDED_ONE, HANDED_TWO])
  return root
}

export function handingBoth(root: string): undefined {
  handing(root, SUB, [HANDED_ONE, HANDED_TWO])
}

export function handedIn(root: string): readonly string[] {
  const said = editsIn(root, handedPageOf(SUB))
  return "why" in said ? [] : said.rows.flatMap(pathsOf)
}

export const MOVED_FROM = "akasha/three/from.md"

export const MOVED_TO = "akasha/three/to.md"

export const MOVED: Stated = { kind: "move", pathFrom: MOVED_FROM, pathTo: MOVED_TO }

export const EDIT: Stated = { kind: "add", path: "a/b.ts", content: "held" }

export const HELD = { edits: [EDIT], refused: null }

export const NOT_TEXT_AT = "akasha/three/wallpaper.png"

export const NOT_TEXT_SAID = `\`${NOT_TEXT_AT}\` is not text, and a change reads a body as text`

export function readingNotText(root: string): Over {
  writeFileSync(join(root, NOT_TEXT_AT), new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a]))
  return async (world) => ({
    edits: [{ kind: "add", path: NOT_TEXT_AT, content: world.textOf(NOT_TEXT_AT) ?? "" }],
    refused: null,
  })
}

export async function acting(
  root: string,
  argv: readonly string[],
  said: Piping = NOTHING
): Promise<Answer> {
  return await changing(root, PAGE, null, argv, said, loading, applying)
}

export async function removing(root: string, at: string, message?: string): Promise<Answer> {
  const said = message === undefined ? taking(at) : asking(at, message)
  return await acting(root, ["remove-page"], piping(said))
}

export const BOTH: readonly string[] = [NAMER_CODE, NAMER_PAGE]

export function keptIn(root: string): readonly string[] {
  return [...pathsIn(root)].sort()
}

export function saysApply(said: Answer): boolean {
  return said.report.some((one) => one.includes("akasha apply"))
}

export const DROPPED_BOTH: readonly string[] = [
  ...[`takes ${NAMER_CODE} away`, `takes ${NAMER_PAGE} away`].sort(),
  "these edits are gone, and no apply lands them",
]

export const DROPPED_ONE: readonly string[] = [
  `takes ${NAMER_CODE} away`,
  "these edits are gone, and no apply lands them",
  "1 edit(s) are still kept beside this agent's page",
]

export const HANDED_SAID: readonly string[] = [
  "tester-one handed 1 edit(s) over",
  "tester-two handed 2 edit(s) over",
  "`akasha change take <subagent>` takes one of these into this agent's own",
]

export const NONE_HANDED = "no subagent has handed edits to this agent"

export function owedIn(root: string): readonly (boolean | undefined)[] {
  const said = editsIn(root, PAGE)
  return "why" in said ? [] : said.rows.map((one) => one.readersOweReading)
}

export function drafting(root: string, at: string): Promise<Answer> {
  return acting(root, ["remove-page"], piping(`${taking(at)}draft: true\n`))
}

export function draftingAndApplying(root: string, at: string): Promise<Answer> {
  return acting(root, ["remove-page"], piping(`${taking(at)}draft: true\napply: a message\n`))
}

export const BAD_DROPS: readonly (readonly [readonly string[], Piping | undefined])[] = [
  [["drop", NAMER_CODE], undefined],
  [["drop"], piping(`${NAMER_CODE}\n`)],
  [["drop"], () => ({ unreadable: "went quiet", part: true as const })],
  [["drop"], piping("all: yes\n")],
]

export type Drop = {
  readonly name: string
  readonly removes: readonly string[]
  readonly sets?: (root: string) => void
  readonly said?: Piping
  readonly code?: number
  readonly refusals?: readonly string[]
  readonly refusalHolds?: string
  readonly report?: readonly string[]
  readonly holds?: string
  readonly first?: string
  readonly kept?: readonly string[]
}

export const DROPS: readonly Drop[] = [
  {
    name: "a drop saying `all: true` takes away every edit kept and names each edit that went",
    removes: [NAMER_PAGE],
    said: piping("all: true\n"),
    code: 0,
    refusals: [],
    report: DROPPED_BOTH,
    kept: [],
  },
  {
    name: "a drop saying `all: true` over no edit kept says so rather than refusing",
    removes: [],
    said: piping("all: true\n"),
    code: 0,
    refusals: [],
    report: ["no edits are kept beside this agent's page, so nothing went"],
  },
  {
    name: "a drop naming one path takes that path's edit and leaves the rest",
    removes: [NAMER_PAGE],
    said: piping(taking(NAMER_CODE)),
    refusals: [],
    report: DROPPED_ONE,
    kept: [NAMER_PAGE],
  },
  {
    name: "a drop naming several paths takes away every edit those paths name",
    removes: [NAMER_PAGE, SPARE_PAGE],
    said: piping(taking(NAMER_CODE) + taking(NAMER_PAGE)),
    holds: "2 edit(s) are still kept beside this agent's page",
    kept: [SPARE_CODE, SPARE_PAGE],
  },
  {
    name: "a path naming no edit kept refuses the drop and leaves every edit kept",
    removes: [NAMER_PAGE],
    said: piping(taking(MISSING)),
    code: 1,
    refusals: [`\`${MISSING}\` names no edit kept beside this agent's page, so nothing went`],
    kept: BOTH,
  },
  {
    name: "an input that will not open refuses the drop and leaves every edit kept",
    removes: [NAMER_PAGE],
    said: () => ({ unreadable: "ENXIO" }),
    code: 1,
    refusalHolds: "piped nothing in",
    kept: BOTH,
  },
  {
    name: "an edit a move left behind is taken away by the path that move came from",
    removes: [],
    sets: (root) => appendEdits(root, PAGE, [MOVED]),
    said: piping(taking(MOVED_FROM)),
    refusals: [],
    first: `moves ${MOVED_FROM} to ${MOVED_TO}`,
    kept: [],
  },
  {
    name: "a drop piping nothing in refuses and leaves every edit kept",
    removes: [NAMER_PAGE],
    code: 1,
    refusalHolds: "piped nothing in",
    kept: BOTH,
  },
  {
    name: "`all: true` named beside a path refuses the drop and leaves every edit kept",
    removes: [NAMER_PAGE],
    said: piping(`all: true\n${taking(NAMER_CODE)}`),
    code: 1,
    refusalHolds: "the two together are refused",
    kept: BOTH,
  },
]

export type Hand = {
  readonly name: string
  readonly act: string
  readonly said?: Piping
  readonly code?: number
  readonly refusals?: readonly string[]
  readonly refusalHolds?: string
  readonly report?: readonly string[]
  readonly own?: readonly string[]
  readonly left?: readonly string[]
}

const HANDED_BOTH: readonly string[] = [HANDED_AT, HANDED_OTHER]

const TOOK = "these edits are this agent's own now, and `akasha apply` lands them"

const WENT = "these edits are gone, and no apply lands them"

const ONE_LEFT = "1 edit(s) are still handed over by this subagent"

function refusingBoth(name: string, holds: string, said?: Piping): readonly Hand[] {
  return ["take", "forget"].map((act) => ({
    name: `${name}, and that ${act} moves nothing`,
    act,
    said,
    code: 1,
    refusalHolds: holds,
    own: [],
    left: HANDED_BOTH,
  }))
}

export const HANDS: readonly Hand[] = [
  ...refusingBoth("piping nothing in is refused", "this call piped nothing in"),
  ...refusingBoth(
    "a path naming no edit handed over is refused",
    `\`${MISSING}\` names no edit this subagent handed over`,
    piping(taking(MISSING))
  ),
  ...refusingBoth(
    "`all: true` said beside a path is refused",
    "the two together are refused",
    piping(`all: true\n${taking(HANDED_AT)}`)
  ),
  ...refusingBoth("`all` said another value is refused", "and no other value", piping("all: no\n")),
  ...refusingBoth("an input that will not open is refused", "went quiet", () => ({
    unreadable: "went quiet",
    part: true as const,
  })),
  {
    name: "a take saying `all: true` moves every edit that subagent handed over",
    act: "take",
    said: piping("all: true\n"),
    code: 0,
    refusals: [],
    report: [`adds ${HANDED_AT}`, `adds ${HANDED_OTHER}`, TOOK],
    own: HANDED_BOTH,
    left: [],
  },
  {
    name: "a forget saying `all: true` takes away every edit that subagent handed over",
    act: "forget",
    said: piping("all: true\n"),
    code: 0,
    refusals: [],
    report: [`adds ${HANDED_AT}`, `adds ${HANDED_OTHER}`, WENT],
    own: [],
    left: [],
  },
  {
    name: "a take naming one path moves that edit and leaves the rest handed over",
    act: "take",
    said: piping(taking(HANDED_AT)),
    code: 0,
    refusals: [],
    report: [`adds ${HANDED_AT}`, TOOK, ONE_LEFT],
    own: [HANDED_AT],
    left: [HANDED_OTHER],
  },
  {
    name: "a forget naming one path takes that edit away and leaves the rest handed over",
    act: "forget",
    said: piping(taking(HANDED_OTHER)),
    code: 0,
    refusals: [],
    report: [`adds ${HANDED_OTHER}`, WENT, ONE_LEFT],
    own: [],
    left: [HANDED_AT],
  },
]
