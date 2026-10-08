import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeMechanicalFileContentRemove = {
  id: "01a07cbf-f870-7bad-a1dd-a3bc093c2410",
  type: "page-type/domain",
  slug: "change-mechanical-file-content-remove",
  definition: "a mechanical change that removes text",
  parts: [
    "change-mechanical-file-content/remove-export-keyword",
    "change-mechanical-file-content/remove-property-record",
    "change-mechanical-file-content/remove-property-value",
    "change-mechanical-file-content/remove-type-member",
  ],
  createdAt: "2026-09-07T16:42:30.896Z",
  updatedAt: "2026-09-25T13:41:59.000Z",
} as const satisfies Domain
