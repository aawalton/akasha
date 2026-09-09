import { pathsOf } from "@akasha/changes/change-answer"
import type { FileChange } from "@akasha/changes/change-answer/types"
import { appendEdits, editsIn } from "@akasha/changes/edits-keeping"
import { handedPageOf } from "@akasha/changes/subagent-handed"
import { indexedRepo } from "@akasha/indexes/indexing/testing"
import { mistaking } from "../../../command-system/asking/asking.module.code.ts"
import type { Answer } from "../../../command-system/calling/calling.module.code.ts"
import type { Piping } from "../piping/piping.module.code.ts"
import {
  DROP_WORDS,
  dropping,
  forgetting,
  pipedPathsIn,
  taking,
} from "./change-acting.module.code.ts"

export const PAGE = "akasha/seat-system/seats/pages/tester.seat.ts"

export const SUB = "tester-one"

export const OTHER = "tester-two"

export const MISSING = "akasha/one/missing.module.ts"

export const KEPT_ONE = "akasha/three/one.md"

export const KEPT_TWO = "akasha/three/two.md"

export const SPARE = "akasha/three/spare.md"

export const MOVED_FROM = "akasha/three/from.md"

export const MOVED_TO = "akasha/three/to.md"

export const HANDED_AT = "akasha/three/handed.md"

export const HANDED_OTHER = "akasha/three/other.md"

export const HANDED_ONE: FileChange = { kind: "add", path: HANDED_AT, content: "handed" }

export const HANDED_TWO: FileChange = { kind: "add", path: HANDED_OTHER, content: "other" }

const MOVED: FileChange = { kind: "move", pathFrom: MOVED_FROM, pathTo: MOVED_TO }

export const KEPT_BOTH: readonly string[] = [KEPT_ONE, KEPT_TWO]

export const HANDED_BOTH: readonly string[] = [HANDED_AT, HANDED_OTHER]

export const DROPPED = "these edits are gone, and no apply lands them"

export const TOOK = "these edits are this agent's own now, and `akasha change apply` lands them"

export const NONE_HANDED = "no subagent has handed edits to this agent"

export const NOTHING_HELD = "no edits are kept beside this agent's page"

export const HANDED_LANDS =
  "`akasha change take <subagent>` takes one of these into this agent's own"

export const KEPT_LANDS = "`akasha change apply` lands these"

export function repo(): string {
  return indexedRepo()
}

export function piping(said: string): Piping {
  const bytes = new TextEncoder().encode(said)
  return () => ({ bytes })
}

export function naming(...paths: readonly string[]): Piping {
  return piping(paths.map((one) => `at: ${one}\n`).join(""))
}

export const ALL: Piping = piping("all: true\n")

export const ANOTHER: Piping = piping("all: no\n")

export const NOTHING: Piping = piping("")

export const QUIET: Piping = () => ({ unreadable: "went quiet", part: true as const })

function rowsIn(root: string, page: string): readonly FileChange[] {
  const said = editsIn(root, page)
  return "why" in said ? [] : said.rows
}

export function keptIn(root: string): readonly string[] {
  return rowsIn(root, PAGE).flatMap(pathsOf).sort()
}

export function handedIn(root: string): readonly string[] {
  return rowsIn(root, handedPageOf(SUB)).flatMap(pathsOf).sort()
}

export function handing(root: string, under: string, rows: readonly FileChange[]): undefined {
  appendEdits(root, handedPageOf(under), rows)
}

export function handingBoth(root: string): string {
  handing(root, SUB, [HANDED_ONE, HANDED_TWO])
  return root
}

export function keeping(root: string): string {
  appendEdits(root, PAGE, [
    { kind: "remove", path: KEPT_ONE },
    { kind: "remove", path: KEPT_TWO },
  ])
  return root
}

export function droppingPiped(root: string, said: Piping): Answer {
  const piped = pipedPathsIn(said, DROP_WORDS)
  return typeof piped === "string" ? mistaking([piped]) : dropping(root, PAGE, piped)
}

export type Drop = {
  readonly name: string
  readonly bare?: boolean
  readonly sets?: (root: string) => void
  readonly said: Piping
  readonly code?: number
  readonly refusals?: readonly string[]
  readonly refusalHolds?: string
  readonly report?: readonly string[]
  readonly holds?: string
  readonly first?: string
  readonly kept?: readonly string[]
}

const STILL_ONE = "1 edit(s) are still kept beside this agent's page"

export const DROPS: readonly Drop[] = [
  {
    name: "a drop saying `all: true` takes away every edit kept and names each edit that went",
    said: ALL,
    code: 0,
    refusals: [],
    report: [`takes ${KEPT_ONE} away`, `takes ${KEPT_TWO} away`, DROPPED],
    kept: [],
  },
  {
    name: "a drop saying `all: true` over no edit kept says so rather than refusing",
    bare: true,
    said: ALL,
    code: 0,
    refusals: [],
    report: ["no edits are kept beside this agent's page, so nothing went"],
  },
  {
    name: "a drop naming one path takes that path's edit and leaves the rest",
    said: naming(KEPT_ONE),
    refusals: [],
    report: [`takes ${KEPT_ONE} away`, DROPPED, STILL_ONE],
    kept: [KEPT_TWO],
  },
  {
    name: "a drop naming several paths takes away every edit those paths name",
    sets: (root) => appendEdits(root, PAGE, [{ kind: "remove", path: SPARE }]),
    said: naming(KEPT_ONE, KEPT_TWO),
    holds: STILL_ONE,
    kept: [SPARE],
  },
  {
    name: "a path naming no edit kept refuses the drop and leaves every edit kept",
    said: naming(MISSING),
    code: 1,
    refusals: [`\`${MISSING}\` names no edit kept beside this agent's page, so nothing went`],
    kept: KEPT_BOTH,
  },
  {
    name: "an edit a move left behind is taken away by the path that move came from",
    bare: true,
    sets: (root) => appendEdits(root, PAGE, [MOVED]),
    said: naming(MOVED_FROM),
    refusals: [],
    first: `moves ${MOVED_FROM} to ${MOVED_TO}`,
    kept: [],
  },
  {
    name: "a drop piping nothing in refuses and leaves every edit kept",
    said: NOTHING,
    code: 1,
    refusalHolds: "piped nothing in",
    kept: KEPT_BOTH,
  },
  {
    name: "an input that will not open refuses the drop and leaves every edit kept",
    said: QUIET,
    code: 1,
    refusalHolds: "went quiet",
    kept: KEPT_BOTH,
  },
  {
    name: "`all: true` named beside a path refuses the drop and leaves every edit kept",
    said: piping(`all: true\nat: ${KEPT_ONE}\n`),
    code: 1,
    refusalHolds: "the two together are refused",
    kept: KEPT_BOTH,
  },
  {
    name: "`all` said another value refuses the drop and leaves every edit kept",
    said: ANOTHER,
    code: 1,
    refusals: ["`all` takes `true` to take away every edit kept, and no other value"],
    kept: KEPT_BOTH,
  },
  {
    name: "a line naming no path refuses the drop and leaves every edit kept",
    said: piping(`${KEPT_ONE}\n`),
    code: 1,
    refusalHolds: "names no path",
    kept: KEPT_BOTH,
  },
]

export type Acting = (root: string, page: string, under: string | undefined, said: Piping) => Answer

export type Hand = {
  readonly name: string
  readonly act: Acting
  readonly said: Piping
  readonly code?: number
  readonly refusals?: readonly string[]
  readonly refusalHolds?: string
  readonly report?: readonly string[]
  readonly own?: readonly string[]
  readonly left?: readonly string[]
}

const ONE_LEFT = "1 edit(s) are still handed over by this subagent"

const ACTS: readonly (readonly [string, Acting])[] = [
  ["take", taking],
  ["forget", forgetting],
]

function refusingBoth(name: string, holds: string, said: Piping): readonly Hand[] {
  return ACTS.map(([word, act]) => ({
    name: `${name}, and that ${word} moves nothing`,
    act,
    said,
    code: 1,
    refusalHolds: holds,
    own: [],
    left: HANDED_BOTH,
  }))
}

export const HANDS: readonly Hand[] = [
  ...refusingBoth("piping nothing in is refused", "this call piped nothing in", NOTHING),
  ...refusingBoth(
    "a path naming no edit handed over is refused",
    `\`${MISSING}\` names no edit this subagent handed over`,
    naming(MISSING)
  ),
  ...refusingBoth(
    "`all: true` said beside a path is refused",
    "the two together are refused",
    piping(`all: true\nat: ${HANDED_AT}\n`)
  ),
  ...refusingBoth("`all` said another value is refused", "and no other value", ANOTHER),
  ...refusingBoth("an input that will not open is refused", "went quiet", QUIET),
  {
    name: "a take saying `all: true` moves every edit that subagent handed over",
    act: taking,
    said: ALL,
    code: 0,
    refusals: [],
    report: [`adds ${HANDED_AT}`, `adds ${HANDED_OTHER}`, TOOK],
    own: HANDED_BOTH,
    left: [],
  },
  {
    name: "a forget saying `all: true` takes away every edit that subagent handed over",
    act: forgetting,
    said: ALL,
    code: 0,
    refusals: [],
    report: [`adds ${HANDED_AT}`, `adds ${HANDED_OTHER}`, DROPPED],
    own: [],
    left: [],
  },
  {
    name: "a take naming one path moves that edit and leaves the rest handed over",
    act: taking,
    said: naming(HANDED_AT),
    code: 0,
    refusals: [],
    report: [`adds ${HANDED_AT}`, TOOK, ONE_LEFT],
    own: [HANDED_AT],
    left: [HANDED_OTHER],
  },
  {
    name: "a forget naming one path takes that edit away and leaves the rest handed over",
    act: forgetting,
    said: naming(HANDED_OTHER),
    code: 0,
    refusals: [],
    report: [`adds ${HANDED_OTHER}`, DROPPED, ONE_LEFT],
    own: [],
    left: [HANDED_AT],
  },
]
