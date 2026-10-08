import type { ChangeTargetSubtype } from "akasha/change/target/subtype/change-target-subtype.page-type.types.ts"

export const fileManifest = {
  id: "01a09b64-cd05-71e5-a322-6bbfabfdb478",
  type: "page-type/change-target-subtype",
  slug: "file-manifest",
  definition: "a file holding a package manifest",
  changeTargetType: "change-target-type/file",
  parent: "change-target-subtype/file",
  createdAt: "2026-09-13T15:31:09.701Z",
  updatedAt: "2026-09-15T16:13:26.000Z",
} as const satisfies ChangeTargetSubtype
