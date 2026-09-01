import type { PageTypeDataJSON } from "../pages/pages.module.code.ts"

export const NON_EMPTY_CONTENT_KEYS_ATTR = "nonEmptyContentKeys"

export function pageHasNonEmptyContentKey(
  page: Readonly<Record<string, unknown>>,
  key: string
): boolean {
  const raw = page[NON_EMPTY_CONTENT_KEYS_ATTR]
  return Array.isArray(raw) && raw.includes(key)
}

export function bodyPropertyIsContentTier(pageTypeData: PageTypeDataJSON): boolean {
  const bodyPropertyId = pageTypeData.detailConfig?.bodyPropertyId
  if (bodyPropertyId == null) return false
  const def = pageTypeData.propertyDefinitions.find((d) => d.id === bodyPropertyId)
  return def?.storage === "content"
}
