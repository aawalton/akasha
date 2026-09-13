import type { ChangeTargetSubtype } from "akasha/changes/targets/subtypes/change-target-subtype.page-type.types.ts"

export const fileManifest = {
  id: "01a09b64-cd05-71e5-a322-6bbfabfdb478",
  type: "change-target-subtype",
  slug: "file-manifest",
  definition: "a file holding a package manifest",
  changeTargetType: "change-target-type/file",
  parent: "change-target-subtype/file",
} as const satisfies ChangeTargetSubtype
