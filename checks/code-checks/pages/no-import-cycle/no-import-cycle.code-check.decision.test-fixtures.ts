import { nothingFiled } from "@akasha/indexes/testing"
import type { Change } from "@akasha/pages/change"
import { ran } from "@akasha/utils/run/running"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { writing } from "../../../../commands/modules/scratching/scratching.module.test-fixtures.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { refusalsOver } from "./no-import-cycle.code-check.decision.code.ts"

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

const encoder = new TextEncoder()

export function bodied(root: string, bodies: Readonly<Record<string, string>>): Change {
  const at = (path: string): Uint8Array | null => {
    const said = bodies[path]
    return said === undefined ? null : encoder.encode(said)
  }
  return { root, changed: Object.keys(bodies).toSorted(), after: at, before: at }
}

export function change(bodies: Readonly<Record<string, string>>): Change {
  return bodied(ROOT, bodies)
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
