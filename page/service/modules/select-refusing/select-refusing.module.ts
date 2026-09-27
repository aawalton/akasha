import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const selectRefusing = {
  id: "01a0e081-01f7-7419-93f2-298eb3697f31",
  type: "page-type/module",
  slug: "select-refusing",
  definition: "a value handed to a select property, judged against the values that property takes",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A select property takes the values that property states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A select property stating no values takes the values its page type states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property whose page type extends the select property is a select property.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each value in a list handed to a select property is judged alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value is judged by the select property's own validation rather than a second one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the property and the value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value that is nothing is no refusal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A select property whose values nothing states is not judged.",
    },
  ],
} as const satisfies Module
