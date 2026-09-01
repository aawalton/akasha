import { said } from "@akasha/utils-run/running"

export function gitIn(root: string, argv: readonly string[]): string {
  return said(["git", "-C", root, ...argv])
}
