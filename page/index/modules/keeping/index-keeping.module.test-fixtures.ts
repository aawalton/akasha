import { existsSync } from "node:fs"
import { join } from "node:path"
import { BUILT_AT } from "akasha/page/index/modules/surface/index-surface.module.code.ts"

export function builtThere(root: string): boolean {
  return existsSync(join(root, BUILT_AT))
}
