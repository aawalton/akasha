import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeMechanicalFileContentAdd = {
  id: "01a07cbf-ddf1-7510-8754-5aa087d7d8a0",
  type: "page-type/domain",
  slug: "change-mechanical-file-content-add",
  definition: "a mechanical change that adds to a file's body",
  parts: [
    "change-mechanical-file-content/add-page-property",
    "change-mechanical-file-content/add-property-record",
    "change-mechanical-file-content/add-property-value",
    "change-mechanical-file-content/add-type-member",
    "change-mechanical-file-content/add-property-to-pages",
  ],
  createdAt: "2026-09-07T16:42:24.113Z",
  updatedAt: "2026-09-25T13:36:44.000Z",
} as const satisfies Domain
