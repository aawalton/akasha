import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const monarch = {
  id: "01a0538f-7c09-7c69-a9d0-d209d9a480db",
  pageTypeSlug: "domain",
  slug: "monarch",
  definition:
    "the outside service that gathers every account Alan holds into one picture of his money",
  partSlugs: ["readout/monarch-unreviewed-transactions"],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The categorization ring reads Monarch directly on Alan's own signed-in browser cookie.",
    },
    {
      invariantKind: "constraint",
      statement: "A Monarch session cookie comes only from Alan at a signed-in browser.",
    },
  ],
} as const satisfies Domain
