import type { Role } from "../role.page-type.ts"

export const operator = {
  id: "01a053c5-8d2c-70e4-8a45-06368ddfc0ae",
  pageTypeSlug: "role",
  slug: "operator",
  definition: "an agent keeping one domain's conditions true",
  onCall: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An operator asks their principal when they are not sure what to do.",
    },
  ],
} as const satisfies Role
