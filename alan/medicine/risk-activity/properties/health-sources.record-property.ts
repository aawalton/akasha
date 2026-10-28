import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const healthSources = {
  id: "01a183c0-83c8-7fc5-95c9-f9fbe08f7259",
  type: "page-type/record-property",
  slug: "health-sources",
  propertySlug: "sources",
  definition: "the published works the health figures on a page are taken from",
  properties: [
    { pageProperty: "text-property/health-source-citation", required: true, many: false },
    { pageProperty: "url-property/health-source-url", required: false, many: false },
  ],
  types: "ts",
  createdAt: "2026-10-28T18:23:14.375Z",
  updatedAt: "2026-10-28T18:23:14.375Z",
} as const satisfies RecordProperty
