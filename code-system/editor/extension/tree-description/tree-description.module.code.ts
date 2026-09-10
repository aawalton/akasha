export function describedAs(matched: number | undefined, total: number): string {
  if (matched !== undefined) return `${matched} of ${total}`
  return total === 1 ? "1 row" : `${total} rows`
}
