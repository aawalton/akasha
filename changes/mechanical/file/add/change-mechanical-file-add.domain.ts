import type { Domain } from "../../../../domains/domain.page-type.ts"

export const changeMechanicalFileAdd = {
  id: "01a07cbe-0ba6-7171-9d7d-de7707aec829",
  pageTypeSlug: "domain",
  slug: "change-mechanical-file-add",
  definition: "a mechanical change adding a file",
  parts: [
    "change-mechanical-file/add-file",
    "change-mechanical/add-file-of-any-kind",
    "change-mechanical/add-file-code",
    "change-mechanical/add-file-page",
    "change-mechanical/add-file-page-type",
    "change-mechanical/add-file-page-property",
  ],
} as const satisfies Domain
