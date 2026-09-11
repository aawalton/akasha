import type { Body } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import { bodyFrom } from "akasha/checks/modules/judged-body/judged-body.module.code.ts"
import { founded } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/commands/modules/scratching/scratching.module.test-fixtures.ts"
import { ran } from "akasha/utils/run/running/running.module.code.ts"

export const ROOT = "/repo"

export const AT = "akasha/held.ts"

export const SENT = 'export { a } from "./b.ts"\n'

export const scratch = scratchWorld()

export function given(at: string, body: string): Body {
  return bodyFrom(ROOT, at, body)
}

export function rooted(
  files: Readonly<Record<string, string>>,
  prefix: string = "akasha-no-re-export-"
): string {
  const root = scratch.rootFor(prefix)
  founded(root)
  for (const [path, body] of Object.entries(files)) writing(root, path, body)
  return root
}

export function tracked(files: Readonly<Record<string, string>>): string {
  const root = rooted(files, "akasha-no-re-export-audit-")
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}
