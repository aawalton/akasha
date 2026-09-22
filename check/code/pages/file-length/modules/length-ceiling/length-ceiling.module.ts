import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lengthCeiling = {
  id: "01a0c9ce-dad6-7000-bc75-7c23a3b6d5d7",
  type: "page-type/module",
  slug: "length-ceiling",
  definition: "the byte ceiling each kind of file is held to",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A code file is held to fifteen thousand bytes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A markup file is held to a hundred and twenty-eight kibibytes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A prose file is held to a hundred and twenty-eight kibibytes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The whole prose of a page is held to five hundred and twelve kibibytes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller wanting one of these numbers reaches only these numbers.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says which ceiling a path is held to.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file or reaches the index.",
    },
  ],
} as const satisfies Module
