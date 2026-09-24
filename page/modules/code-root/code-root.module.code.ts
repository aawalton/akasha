import { existsSync } from "node:fs"
import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import { ownRepoRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

export function codeRoot(): string {
  const stated = optionalEnv("CODE_ROOT")
  if (stated !== undefined && existsSync(stated)) return stated
  return ownRepoRoot()
}
