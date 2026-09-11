import type { AuthorityKind } from "akasha/persons/authority-kinds/authority-kind.page-type.types.ts"

export const domain = {
  id: "01a0542d-4b9e-77fa-a4e8-805866c6f329",
  type: "authority-kind",
  slug: "domain",
  definition: "what a domain states of itself and of what is beneath it",
} as const satisfies AuthorityKind
