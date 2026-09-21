import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const relationDisplay = {
  id: "01a05cba-f39f-7e30-90ba-2bc9d8ac77bd",
  type: "page-type/module",
  slug: "relation-display",
  definition: "the page a relation value reaches, and the name and color it is drawn under",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A relation value is handed to the resolver unchanged, id or address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chip links and navigates by the id of the page the relation reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relation value reaching no page is drawn as the text that value is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page holding no title is drawn as the text reaching it rather than as Untitled.",
    },
  ],
} as const satisfies Module
