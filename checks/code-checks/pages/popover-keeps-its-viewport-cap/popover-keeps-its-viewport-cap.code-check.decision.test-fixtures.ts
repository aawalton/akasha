import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { ran } from "@akasha/utils/run/running"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { claiming } from "../../../modules/scratch/check-scratch.module.code.ts"

export const WRAPPER_AT = "design/primitives/popover/popover.module.code.tsx"

export const USES_AT = "web/one/one.module.code.tsx"

export const WRAPPER =
  "export function PopoverContent() {\n" +
  '  return <Inner collisionPadding={8} className="max-w-(--radix-popover-content-available-width)" />\n' +
  "}\n"

const ID = "01a082e9-5908-7001-8000-000000000001"

export const scratch = scratchWorld()

export function rooted(files: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-popover-")
  for (const [path, said] of Object.entries(files)) {
    const at = join(root, path)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, said)
    claiming(root, path, path, ID)
  }
  return root
}

export function tracked(files: Readonly<Record<string, string>>): string {
  const root = rooted(files)
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}
