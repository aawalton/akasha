import { existsSync } from "node:fs"
import { ownRepoRoot } from "../checkout-roots/checkout-roots.module.code.ts"

export function codeRoot(): string {
  const stated = process.env.CODE_ROOT
  if (stated !== undefined && stated !== "" && existsSync(stated)) return stated
  return ownRepoRoot()
}
