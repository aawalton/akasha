import type { Domain } from "../../../../domains/domain.page-type.ts"

export const changeMechanicalFileAdd = {
  id: "01a07cbe-0ba6-7171-9d7d-de7707aec829",
  pageTypeSlug: "domain",
  slug: "change-mechanical-file-add",
  definition: "a mechanical change adding a file",
  partSlugs: [
    "change-mechanical-file/add-file",
    "change-mechanical-file/add-file-code",
    "change-mechanical-file/add-file-page",
    "change-mechanical-file/add-file-page-type",
    "change-mechanical-file/add-file-page-property",
  ],
} as const satisfies Domain
