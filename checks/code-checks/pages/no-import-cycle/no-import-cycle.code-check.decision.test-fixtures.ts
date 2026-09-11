import { refusalsOver } from "akasha/checks/code-checks/pages/no-import-cycle/no-import-cycle.code-check.decision.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import {
  bodiesOver,
  change as staged,
} from "akasha/checks/modules/staging/check-staging.module.code.ts"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/commands/modules/scratching/scratching.module.test-fixtures.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { nothingFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { ran } from "akasha/utils/run/running/running.module.code.ts"

export const AT = "akasha/one.ts"

export const TWO_AT = "akasha/two.ts"

export const OUTSIDE = "akasha/outside.ts"

export const scratch = scratchWorld()

export function rooted(): string {
  const root = scratch.rootFor("akasha-cycle-")
  nothingFiled(root)
  return root
}

export const ROOT = rooted()

export const READS_TWO = 'import { two } from "./two.ts"\n\nexport const one = two\n'

export const READS_ONE = 'import { one } from "./one.ts"\n\nexport const two = one\n'

export const READS_ONE_OUT = 'import { one } from "./one.ts"\n\nexport const out = one\n'

export const ALONE = "export const one = 1\n"

export function change(bodies: Readonly<Record<string, string>>): Change {
  return bodiesOver(ROOT, bodies)
}

export function patched(
  before: Readonly<Record<string, string>>,
  after: Readonly<Record<string, string | null>>,
  root: string = ROOT
): Change {
  return staged(root, after, before)
}

export function refused(bodies: Readonly<Record<string, string>>): readonly Judged[] {
  return refusalsOver(change(bodies))
}

export function pathsRefused(bodies: Readonly<Record<string, string>>): readonly string[] {
  return refused(bodies).map((one) => one.path)
}

export function tracked(bodies: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-cycle-audit-")
  for (const [path, body] of Object.entries(bodies)) writing(root, path, body)
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}
