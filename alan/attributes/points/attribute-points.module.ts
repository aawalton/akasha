import type { Module } from "@akasha/code/module"

export const attributePoints = {
  id: "01a081f8-593c-795e-92d9-6c2e0b74460e",
  pageTypeSlug: "module",
  slug: "attribute-points",
  definition: "the points an attribute has earned, kept beside that attribute's page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An attribute's points are kept in the file beside that attribute's page.",
    },
    {
      invariantKind: "departure",
      statement: "The points never reach the commit.",
    },
    {
      invariantKind: "departure",
      statement: "The keys the points are carried under are named here alone.",
    },
    {
      invariantKind: "departure",
      statement: "An attribute's page is found from that attribute's slug.",
    },
    {
      invariantKind: "departure",
      statement: "Keeping today's points leaves the total beside them unchanged.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out what an attribute earned.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides when the points are due.",
    },
  ],
} as const satisfies Module
