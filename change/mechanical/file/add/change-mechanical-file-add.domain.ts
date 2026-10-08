import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeMechanicalFileAdd = {
  id: "01a07cbe-0ba6-7171-9d7d-de7707aec829",
  type: "page-type/domain",
  slug: "change-mechanical-file-add",
  definition: "a mechanical change that adds a file",
  parts: [
    "change-mechanical-file/add-file",
    "change-mechanical/add-file-code",
    "change-mechanical/add-file-of-any-kind",
    "change-mechanical/add-file-page",
    "change-mechanical/add-file-page-property",
    "change-mechanical/add-file-page-type",
  ],
  createdAt: "2026-09-07T16:40:24.742Z",
  updatedAt: "2026-09-25T13:36:44.000Z",
} as const satisfies Domain
