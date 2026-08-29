export { baseOf as headOf } from "../command-system/landing.module.code.ts"

import { execFileSync } from "node:child_process"

export function gitIn(root: string, argv: readonly string[]): string {
  return execFileSync("git", ["-C", root, ...argv], { encoding: "utf8" })
}
