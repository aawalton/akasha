import type { Domain } from "../../../../domains/domain.page-type.ts"

export const changeMechanicalFileContentRename = {
  id: "01a07cc0-05e8-7a25-818b-3795f0fc2ef1",
  pageTypeSlug: "domain",
  slug: "change-mechanical-file-content-rename",
  definition: "a mechanical change spelling a name anew in what a file holds",
  partSlugs: [
    "change-mechanical-code/change-imports",
    "change-mechanical-code/rename-export",
    "change-mechanical-code/rename-local-variable",
    "change-mechanical-data/rename-page-address",
    "change-mechanical-data/rename-page-slug",
    "change-mechanical-code/rename-property-signature",
  ],
} as const satisfies Domain
