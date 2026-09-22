import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeMechanicalFileContentAdd = {
  id: "01a07cbf-ddf1-7510-8754-5aa087d7d8a0",
  type: "page-type/domain",
  slug: "change-mechanical-file-content-add",
  definition: "a mechanical change adding to what a file holds",
  parts: [
    "change-mechanical-file-content/add-page-property",
    "change-mechanical-file-content/add-property-record",
    "change-mechanical-file-content/add-property-value",
    "change-mechanical-file-content/add-type-member",
    "change-mechanical-file-content/add-property-to-pages",
  ],
} as const satisfies Domain
