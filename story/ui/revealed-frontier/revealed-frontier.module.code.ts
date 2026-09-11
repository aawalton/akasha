import { instantIn } from "akasha/utils/narrow/instant-in/instant-in.module.code.ts"

export function latestFrontierMs(
  rows: readonly Record<string, unknown>[],
  preferredKey: string,
  fallbackKey: string
): number | null {
  let max: number | null = null
  for (const row of rows) {
    const ms = instantIn(row[preferredKey]) ?? instantIn(row[fallbackKey])
    if (ms !== null && (max === null || ms > max)) max = ms
  }
  return max
}
