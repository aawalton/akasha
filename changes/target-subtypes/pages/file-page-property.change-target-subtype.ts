import type { ChangeTargetSubtype } from "../change-target-subtype.page-type.ts"

export const filePageProperty = {
  id: "01a07c70-e94b-7c20-a22e-d3ee67bc58b9",
  pageTypeSlug: "change-target-subtype",
  slug: "file-page-property",
  definition: "a file holding a page property",
  changeTargetTypeSlug: "change-target-type/file",
  parentSlug: "change-target-subtype/file-page",
} as const satisfies ChangeTargetSubtype
