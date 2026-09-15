import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageCarry = {
  id: "01a0686e-6807-7000-9245-b0c6335299c1",
  type: "module",
  slug: "page-carry",
  definition: "a value read off a page carried as text, as a list of text, or as nothing",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value that is already text is carried as the value is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number and a boolean are carried as text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value that is neither text nor a number nor a boolean nor a list is carried as its JSON.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value that is absent is carried as nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
