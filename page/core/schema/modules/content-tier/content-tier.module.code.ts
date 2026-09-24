const NON_EMPTY_CONTENT_KEYS_ATTR = "nonEmptyContentKeys"

export function pageHasNonEmptyContentKey(
  page: Readonly<Record<string, unknown>>,
  key: string
): boolean {
  const raw = page[NON_EMPTY_CONTENT_KEYS_ATTR]
  return Array.isArray(raw) && raw.includes(key)
}
