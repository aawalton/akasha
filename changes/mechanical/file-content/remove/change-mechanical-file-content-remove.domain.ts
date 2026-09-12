import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const changeMechanicalFileContentRemove = {
  id: "01a07cbf-f870-7bad-a1dd-a3bc093c2410",
  type: "domain",
  slug: "change-mechanical-file-content-remove",
  definition: "a mechanical change taking part of what a file holds away",
  parts: [
    "change-mechanical-file-content/remove-export-keyword",
    "change-mechanical-file-content/remove-manifest-ways",
    "change-mechanical-file-content/remove-page-property",
    "change-mechanical-file-content/remove-property-record",
    "change-mechanical-file-content/remove-property-value",
    "change-mechanical-file-content/remove-type-member",
  ],
} as const satisfies Domain
