import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageNarrowing = {
  id: "01a0b840-0db7-7493-9be4-67c2dc2b3a46",
  type: "page-type/module",
  slug: "page-narrowing",
  definition: "the type a page being created is held to, less the properties a generator fills",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page being created is compiled against its type less the properties a generator fills.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The type a body is held to is narrowed and no diagnostic is suppressed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The narrowing is written on the line the `satisfies` clause already stands on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page being created and carrying no `satisfies` clause is compiled as the page stands.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No import is added for the narrowing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page the change did not bring into being is held to its whole type.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here builds a program or reads a diagnostic.",
    },
  ],
} as const satisfies Module
