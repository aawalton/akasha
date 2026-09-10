import type { Domain } from "../../../../domains/domain.page-type.types.ts"

export const changeMechanicalFileContentChange = {
  id: "01a07cbf-eb60-7d05-bc64-0485666cca0f",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "change-mechanical-file-content-change",
  definition: "a mechanical change restating what a file has",
  parts: [
    "change-mechanical-file-content/change-file-content",
    "change-mechanical-file-content/change-file-content-code",
    "change-mechanical-file-content/change-manifest-ways",
    "change-mechanical-file-content/change-page-page-property",
    "change-mechanical-file-content/change-page-page-property-relation",
    "change-mechanical-file-content/change-property-record-field",
    "change-mechanical-file-content/change-domain-parent",
    "change-mechanical-file-content/change-file-content-page",
    "change-mechanical-file-content/change-file-content-of-any-kind",
    "change-mechanical-file-content/change-page-page-type",
  ],
} as const satisfies Domain
