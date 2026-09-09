import type { Domain } from "../domain.page-type.ts"

export const domainPurpose = {
  id: "01a06815-ceaf-7ec0-aa99-46a5438ce629",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "domain-purpose",
  definition: "something a choice is made to serve",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A thing that only helps another purpose is not a purpose.",
    },
  ],
} as const satisfies Domain
