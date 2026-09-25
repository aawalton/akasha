import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeMechanicalPage = {
  id: "01a0d8f9-13ac-7cd1-b60b-ebde4a18da91",
  type: "page-type/domain",
  slug: "change-mechanical-page",
  definition: "a mechanical change acting on a page rather than on the file that page sits in",
  parts: ["domain/change-mechanical-page-rename"],
} as const satisfies Domain
