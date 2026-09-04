import type { View } from "../view.page-type.ts"

export const alanwaltonIdentityThemes = {
  id: "01a06577-2614-7001-8a82-cc9a877c059d",
  pageTypeSlug: "view",
  slug: "alanwalton-identity-themes",
  title: "Themes",
  navSlug: "alanwalton-identity",
  viewPlace: 1,
  layout: "cards",
  visibleProperties: ["value-slug"],
  alwaysShowProperties: ["value-slug"],
  hiddenPropertiesOrder: ["status", "start-date", "end-date", "parent-slug"],
  pageSize: 12,
  itemPageSize: 12,
  groupPageSize: 6,
} as const satisfies View
