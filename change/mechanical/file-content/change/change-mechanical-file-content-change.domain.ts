import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeMechanicalFileContentChange = {
  id: "01a07cbf-eb60-7d05-bc64-0485666cca0f",
  type: "page-type/domain",
  slug: "change-mechanical-file-content-change",
  definition: "a mechanical change that changes a file's body",
  parts: [
    "change-mechanical-file-content/change-domain-parent",
    "change-mechanical-file-content/change-file-content",
    "change-mechanical-file-content/change-file-content-code",
    "change-mechanical-file-content/change-file-content-of-any-kind",
    "change-mechanical-file-content/change-file-content-page",
    "change-mechanical-file-content/change-page-page-property",
    "change-mechanical-file-content/change-page-page-property-relation",
    "change-mechanical-file-content/change-property-record-field",
  ],
  createdAt: "2026-09-07T16:42:27.552Z",
  updatedAt: "2026-09-25T13:38:03.000Z",
} as const satisfies Domain
