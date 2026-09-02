import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type Icons = "jsonl"

export const icons = {
  id: "01a05fd1-d43b-7c0f-bb64-665ec592d68d",
  pageTypeSlug: "page-property-entry",
  slug: "icons",
  propertySlug: "icons",
  definition: "the icon each piece of a set is shown with, one piece to a line",
  properties: [
    { pagePropertySlug: "icon-slot", required: true, many: false },
    { pagePropertySlug: "icon", required: true, many: false },
  ],
} as const satisfies PagePropertyEntry
