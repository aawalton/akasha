import type { Domain } from "../../../../domains/domain.page-type.ts"

export const changeMechanicalFileContentChange = {
  id: "01a07cbf-eb60-7d05-bc64-0485666cca0f",
  pageTypeSlug: "domain",
  slug: "change-mechanical-file-content-change",
  definition: "a mechanical change restating what a file holds",
  partSlugs: [
    "change-mechanical-file-content/change-file-content",
    "change-mechanical-file-content/change-file-content-code",
    "change-mechanical-manifest/change-manifest-ways",
    "change-mechanical-text/change-page-property",
    "change-mechanical-data/change-page-property-relation",
  ],
} as const satisfies Domain
