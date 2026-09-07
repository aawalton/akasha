import type { ChangeTargetSubtype } from "../change-target-subtype.page-type.ts"

export const pagePropertyProse = {
  id: "01a07c7a-362d-7b18-9313-74111bd7c28e",
  pageTypeSlug: "change-target-subtype",
  slug: "page-property-prose",
  definition: "a page property whose value is read as prose",
  changeTargetTypeSlug: "change-target-type/file-content",
  parentSlug: "change-target-subtype/page-property",
} as const satisfies ChangeTargetSubtype
