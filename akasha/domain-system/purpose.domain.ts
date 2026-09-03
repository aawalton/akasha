import type { Domain } from "./domains/domain.page-type.ts"

export const purpose = {
  id: "01a06815-ceaf-7ec0-aa99-46a5438ce629",
  pageTypeSlug: "domain",
  slug: "purpose",
  definition: "something a choice is made to serve",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What only helps another purpose is not a purpose.",
    },
  ],
} as const satisfies Domain
