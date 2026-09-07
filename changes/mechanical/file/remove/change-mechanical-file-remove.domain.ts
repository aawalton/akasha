import type { Domain } from "../../../../domains/domain.page-type.ts"

export const changeMechanicalFileRemove = {
  id: "01a07cbe-1911-72dc-869f-8e733656bc1b",
  pageTypeSlug: "domain",
  slug: "change-mechanical-file-remove",
  definition: "a mechanical change taking a file away",
  partSlugs: [
    "change-mechanical-file/remove-file",
    "change-mechanical-file/remove-file-code",
    "change-mechanical-file/remove-file-page",
  ],
} as const satisfies Domain
