import type { Domain } from "../../../../domains/domain.page-type.ts"

export const changeMechanicalFileContentRemove = {
  id: "01a07cbf-f870-7bad-a1dd-a3bc093c2410",
  pageTypeSlug: "domain",
  slug: "change-mechanical-file-content-remove",
  definition: "a mechanical change taking part of what a file holds away",
  partSlugs: [
    "change-mechanical-manifest/remove-manifest-ways",
    "change-mechanical-file-content/remove-property-value",
  ],
} as const satisfies Domain
