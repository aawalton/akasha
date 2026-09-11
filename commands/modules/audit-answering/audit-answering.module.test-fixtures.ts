import type { Change } from "akasha/pages/change/change.module.code.ts"

export const ROOT = "/elsewhere/nowhere-an-audit-reaches"

export function over(files: readonly string[]): Change {
  return { root: ROOT, changed: files, after: () => null, before: () => null }
}
