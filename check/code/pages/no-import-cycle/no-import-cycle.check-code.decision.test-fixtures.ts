import { refusalsOver } from "akasha/check/code/pages/no-import-cycle/no-import-cycle.check-code.decision.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  bodiesOver,
  graphed,
  change as staged,
} from "akasha/check/test-fixtures/staging/check-staging.test-fixture.code.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/file/disk/modules/scratching/scratching.module.test-fixtures.ts"
import { nothingFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { type Shadow, shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

export const AT = "akasha/one.ts"

export const TWO_AT = "akasha/two.ts"

export const OUTSIDE = "akasha/outside.ts"

export const scratch = scratchWorld()

export function rooted(): string {
  const root = scratch.rootFor("akasha-cycle-")
  nothingFiled(root)
  graphed(root)
  return root
}

export function shadowOf(held: Change): Shadow {
  return shadowAt(held.root)
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
  const held = change(bodies)
  return refusalsOver(held, shadowOf(held))
}

export function pathsRefused(bodies: Readonly<Record<string, string>>): readonly string[] {
  return refused(bodies).map((one) => one.path)
}

export function tracked(bodies: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-cycle-audit-")
  for (const [path, body] of Object.entries(bodies)) writing(root, path, body)
  nothingFiled(root)
  graphed(root)
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}
