import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeMechanicalPage = {
  id: "01a0d8f9-13ac-7cd1-b60b-ebde4a18da91",
  type: "page-type/domain",
  slug: "change-mechanical-page",
  definition: "a mechanical change to a whole page",
  parts: ["domain/change-mechanical-page-rename"],
  createdAt: "2026-09-25T14:29:57.292Z",
  updatedAt: "2026-09-25T14:48:08.000Z",
} as const satisfies Domain
