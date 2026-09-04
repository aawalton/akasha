import type { PROMOTED_COLUMN } from "../routing-core/routing-core.module.code.ts"

export const READ_ONLY_KEYS = [
  "id",
  "seq",
  "pageTypeId",
  "pageTypeSlug",
  "uniqueKey",
] as const satisfies readonly (keyof typeof PROMOTED_COLUMN)[]

export type ReadOnlyKey = (typeof READ_ONLY_KEYS)[number]

const READ_ONLY_SET: ReadonlySet<string> = new Set(READ_ONLY_KEYS)

export function isReadOnlyKey(key: string): key is ReadOnlyKey {
  return READ_ONLY_SET.has(key)
}
