import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const viewMatch = {
  id: "01a05b69-4551-75ff-b040-d348271da6aa",
  type: "page-type/module",
  slug: "view-match",
  definition: "whether a page row falls inside a view",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A condition on a path holds where some value that path reaches holds it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path reaching no value is weighed as a key the row carries nothing under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A condition on a plain key is weighed against the one value that key holds.",
    },
  ],
} as const satisfies Module
