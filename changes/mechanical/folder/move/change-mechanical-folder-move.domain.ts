import type { Domain } from "../../../../domains/domain.page-type.ts"

export const changeMechanicalFolderMove = {
  id: "01a0822c-3027-7333-baae-fac9c7412202",
  pageTypeSlug: "domain",
  slug: "change-mechanical-folder-move",
  definition: "a mechanical change carrying a folder to another path",
  partSlugs: ["change-mechanical-folder/move-folder"],
} as const satisfies Domain
