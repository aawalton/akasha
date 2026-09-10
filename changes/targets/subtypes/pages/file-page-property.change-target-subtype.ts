import type { ChangeTargetSubtype } from "../change-target-subtype.page-type.types.ts"

export const filePageProperty = {
  id: "01a07c70-e94b-7c20-a22e-d3ee67bc58b9",
  pageTypeSlug: "change-target-subtype",
  type: "change-target-subtype",
  slug: "file-page-property",
  definition: "a file with a page property",
  changeTargetType: "change-target-type/file",
  parent: "change-target-subtype/file-page",
} as const satisfies ChangeTargetSubtype
