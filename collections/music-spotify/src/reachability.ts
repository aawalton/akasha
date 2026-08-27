export interface RestrictedResult {
  readonly restricted: true
  readonly status: number
  readonly detail: string
}

export function isRestricted(value: unknown): value is RestrictedResult {
  return (
    typeof value === "object" &&
    value !== null &&
    "restricted" in value &&
    value.restricted === true
  )
}

export const MARKET_STATUSES: readonly number[] = [404]
export const BATCH_STATUSES: readonly number[] = [403, 404]

export async function tolerateStatuses(
  statuses: readonly number[],
  run: () => Promise<unknown>
): Promise<unknown> {
  try {
    return await run()
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err)
    const matched = statuses.find((s) => detail.includes(`spotify API ${s} `))
    if (matched !== undefined) {
      const firstLine = detail.split("\n")[0] ?? detail
      return { restricted: true, status: matched, detail: firstLine } satisfies RestrictedResult
    }
    throw err
  }
}
