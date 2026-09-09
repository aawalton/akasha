import type { Module } from "@akasha/code/module"

export const attributePoints = {
  id: "01a081f8-593c-795e-92d9-6c2e0b74460e",
  pageTypeSlug: "module",
  type: "module",
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
      statement: "An attribute's page is asked of the index by that attribute's slug.",
    },
    {
      invariantKind: "departure",
      statement: "Points kept for an attribute the index names no page for are refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "Points read for an attribute the index names no page for are no points rather than a refusal.",
    },
    {
      invariantKind: "departure",
      statement: "The total kept is the points before today and today's points together.",
    },
    {
      invariantKind: "departure",
      statement: "Keeping today's points again replaces the total rather than adding to it.",
    },
    {
      invariantKind: "departure",
      statement: "Keeping the points before today replaces the total too.",
    },
    {
      invariantKind: "departure",
      statement: "An attribute whose today is unread totals the points before today alone.",
    },
    {
      invariantKind: "departure",
      statement: "An attribute with nothing before today totals today's points alone.",
    },
    {
      invariantKind: "departure",
      statement: "The points before today are kept by the rebuild alone.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides which days fall before today.",
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
