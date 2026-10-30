import {
  mergeUncommitted,
  uncommittedIn,
} from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"

const NEXT_AT = "nextAt"

export function armedAt(root: string, path: string): number | null {
  const held = uncommittedIn(root, path)?.[NEXT_AT]
  if (typeof held !== "string") return null
  const ms = Date.parse(held)
  return Number.isFinite(ms) ? ms : null
}

export function armFor(root: string, path: string, ms: number): undefined {
  mergeUncommitted(root, path, { [NEXT_AT]: new Date(ms).toISOString() })
}
