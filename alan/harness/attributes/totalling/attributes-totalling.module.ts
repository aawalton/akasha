import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const attributesTotalling = {
  id: "01a07899-c5db-720d-b555-089ffd6bae07",
  pageTypeSlug: "module",
  slug: "attributes-totalling",
  definition: "the points each attribute has earned over every day Alan tracked",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A total is the sum of an attribute's points over every day Alan tracked.",
    },
    {
      invariantKind: "departure",
      statement: "A day's points are worked out by the code beside that attribute's readout.",
    },
    {
      invariantKind: "departure",
      statement: "The days are read in one ask.",
    },
    {
      invariantKind: "departure",
      statement: "The days are summed oldest first.",
    },
    {
      invariantKind: "departure",
      statement: "A day carrying nothing an attribute counts adds nothing to that attribute.",
    },
    {
      invariantKind: "departure",
      statement: "An attribute no day carries a figure for is an absent total.",
    },
    {
      invariantKind: "departure",
      statement: "The plants are counted over the span the tracked days cover.",
    },
    {
      invariantKind: "departure",
      statement: "The span opens where the first tracked day opens.",
    },
    {
      invariantKind: "departure",
      statement: "The span closes where the last tracked day closes.",
    },
    {
      invariantKind: "departure",
      statement: "The days that cannot be read leave every attribute unread rather than zero.",
    },
    {
      invariantKind: "absence",
      statement: "No total is kept beside a readout.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here turns a total into a color.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
