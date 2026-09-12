import { pathsOf } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  appendEdits,
  editsIn,
} from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { INPUT, OK } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  DROP_WORDS,
  dropping,
  pipedPathsIn,
} from "akasha/commands/modules/change-acting/change-acting.module.code.ts"
import type { Piping } from "akasha/commands/modules/piping/piping.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { listedFiled } from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import { indexedRepo } from "akasha/pages/indexes/fixture-world/fixture-world.module.code.ts"

const PRESENCE_AT = "akasha/subagent-presence.module.ts"

const PRESENCE_ID = "01a08f0a-0000-7000-8000-000000000001"

const SEAT_ID = "01a05844-6e60-7000-b54c-4b14559df70b"

const OWN = "a38f63805f9b94edf"

export function presenceIn(root: string): string {
  listedFiled(root, "module", "subagent-presence", [{ path: PRESENCE_AT, id: PRESENCE_ID }])
  return `${SEAT_ID}--${OWN}`
}

export const PAGE = "akasha/seat-system/seats/pages/tester.seat.ts"

export const MISSING = "akasha/one/missing.module.ts"

export const KEPT_ONE = "akasha/three/one.md"

export const KEPT_TWO = "akasha/three/two.md"

export const SPARE = "akasha/three/spare.md"

export const MOVED_FROM = "akasha/three/from.md"

export const MOVED_TO = "akasha/three/to.md"

const MOVED: FileChange = { kind: "move", pathFrom: MOVED_FROM, pathTo: MOVED_TO }

export const KEPT_BOTH: readonly string[] = [KEPT_ONE, KEPT_TWO]

export const DROPPED = "these edits are gone, and no apply lands them"

export const NOTHING_HELD = "no edits are kept beside this agent's page"

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
    code: OK,
    refusals: [],
    report: [`takes ${KEPT_ONE} away`, `takes ${KEPT_TWO} away`, DROPPED],
    kept: [],
  },
  {
    name: "a drop saying `all: true` over no edit kept says so rather than refusing",
    bare: true,
    said: ALL,
    code: OK,
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
    code: INPUT,
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
    code: INPUT,
    refusalHolds: "piped nothing in",
    kept: KEPT_BOTH,
  },
  {
    name: "an input that will not open refuses the drop and leaves every edit kept",
    said: QUIET,
    code: INPUT,
    refusalHolds: "went quiet",
    kept: KEPT_BOTH,
  },
  {
    name: "`all: true` named beside a path refuses the drop and leaves every edit kept",
    said: piping(`all: true\nat: ${KEPT_ONE}\n`),
    code: INPUT,
    refusalHolds: "the two together are refused",
    kept: KEPT_BOTH,
  },
  {
    name: "`all` said another value refuses the drop and leaves every edit kept",
    said: ANOTHER,
    code: INPUT,
    refusals: ["`all` takes `true` to take away every edit kept, and no other value"],
    kept: KEPT_BOTH,
  },
  {
    name: "a line naming no path refuses the drop and leaves every edit kept",
    said: piping(`${KEPT_ONE}\n`),
    code: INPUT,
    refusalHolds: "names no path",
    kept: KEPT_BOTH,
  },
]
