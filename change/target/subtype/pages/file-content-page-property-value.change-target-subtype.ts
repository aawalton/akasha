import type { ChangeTargetSubtype } from "akasha/change/target/subtype/change-target-subtype.page-type.types.ts"

export const fileContentPagePropertyValue = {
  id: "01a07c7a-29b7-70e3-933c-4a654f8a45e4",
  type: "page-type/change-target-subtype",
  slug: "file-content-page-property-value",
  definition: "a body taken as the values a page states",
  changeTargetType: "change-target-type/file-content",
  parent: "change-target-subtype/file-content-page",
} as const satisfies ChangeTargetSubtype
