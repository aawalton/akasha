import type { Domain } from "../../../../domains/domain.page-type.ts"

export const changeMechanicalFileMove = {
  id: "01a07cbe-25bd-7fd0-85e4-27292828ea8d",
  pageTypeSlug: "domain",
  slug: "change-mechanical-file-move",
  definition: "a mechanical change carrying a file to another path",
  partSlugs: ["change-mechanical-file/move-file"],
} as const satisfies Domain
