import type { Domain } from "../../../../domains/domain.page-type.types.ts"

export const changeMechanicalFolderMove = {
  id: "01a0822c-3027-7333-baae-fac9c7412202",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "change-mechanical-folder-move",
  definition: "a mechanical change moving a folder to another path",
  parts: ["change-mechanical-folder/move-folder", "change-mechanical-folder/move-folder-package"],
} as const satisfies Domain
