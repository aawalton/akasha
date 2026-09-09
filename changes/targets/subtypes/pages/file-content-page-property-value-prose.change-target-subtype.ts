import type { ChangeTargetSubtype } from "../change-target-subtype.page-type.ts"

export const fileContentPagePropertyValueProse = {
  id: "01a07c7a-362d-7b18-9313-74111bd7c28e",
  pageTypeSlug: "change-target-subtype",
  type: "change-target-subtype",
  slug: "file-content-page-property-value-prose",
  definition: "a page property whose value is read as prose",
  changeTargetType: "change-target-type/file-content",
  parent: "change-target-subtype/file-content-page-property-value",
} as const satisfies ChangeTargetSubtype
