import { ran } from "@akasha/utils/run/running"
import { bodiesAt } from "akasha/testing-system/bodying/bodying.module.code.ts"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { writing } from "../../../../commands/modules/scratching/scratching.module.test-fixtures.ts"
import { founded } from "../../../modules/scratch/check-scratch.module.code.ts"

export const ROOT = "/repo"

export const AT = "akasha/held.ts"

export const STYLE_AT = "akasha/held.stylesheet.styles.css"

export const given = bodiesAt(ROOT, AT)

export const dressed = bodiesAt(ROOT, STYLE_AT)

export const scratch = scratchWorld()

export function rooted(
  files: Readonly<Record<string, string>>,
  prefix: string = "akasha-no-comments-"
): string {
  const root = scratch.rootFor(prefix)
  founded(root)
  for (const [path, body] of Object.entries(files)) writing(root, path, body)
  return root
}

export function tracked(files: Readonly<Record<string, string>>): string {
  const root = rooted(files, "akasha-no-comments-audit-")
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}
