import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const attributePoints = {
  id: "01a081f8-593c-795e-92d9-6c2e0b74460e",
  type: "module",
  slug: "attribute-points",
  definition: "the points an attribute has earned, kept beside that attribute's page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An attribute's points are kept in the file beside that attribute's page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The points never reach the commit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The keys the points are carried under are named here alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An attribute's page is asked of the index by that attribute's slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Points kept for an attribute the index names no page for are refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Points read for an attribute the index names no page for are no points rather than a refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The total kept is the points before today and today's points together.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Keeping today's points again replaces the total rather than adding to the total.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Keeping the points before today replaces the total too.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An attribute whose today is unread totals the points before today alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An attribute with nothing before today totals today's points alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The points before today are kept by the rebuild alone.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here decides which days fall before today.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here works out the points an attribute earned.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here decides when the points are due.",
    },
  ],
} as const satisfies Module
