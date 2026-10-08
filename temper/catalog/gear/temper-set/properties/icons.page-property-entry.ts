import type { PagePropertyEntry } from "akasha/page/property-entry/page-property-entry.page-type.types.ts"

export const icons = {
  id: "01a05fd1-d43b-7c0f-bb64-665ec592d68d",
  type: "page-type/page-property-entry",
  slug: "icons",
  propertySlug: "icons",
  definition: "the icon each piece of a set is shown with, one piece to a line",
  properties: [
    { pageProperty: "text-property/icon-slot", required: true, many: false },
    { pageProperty: "text-property/icon", required: true, many: false },
  ],
  types: "ts",
  createdAt: "2026-09-02T01:53:02.011Z",
  updatedAt: "2026-09-21T15:28:58.000Z",
} as const satisfies PagePropertyEntry
