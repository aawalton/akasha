import type { Domain } from "../../../../domains/domain.page-type.ts"

export const changeMechanicalFileRename = {
  id: "01a07cbe-3284-7c2c-a4bc-d1f84472a60f",
  pageTypeSlug: "domain",
  slug: "change-mechanical-file-rename",
  definition: "a mechanical change spelling a file path anew",
  partSlugs: ["change-mechanical-file/rename-path"],
} as const satisfies Domain
