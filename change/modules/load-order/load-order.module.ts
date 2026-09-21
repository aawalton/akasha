import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const loadOrder = {
  id: "01a0c58d-0246-71c8-bf28-538d27ee7da7",
  type: "page-type/module",
  slug: "load-order",
  definition:
    "the name a declaration's value reads from outside its body, and what runs above that declaration",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A top-level statement that declares nothing runs as its body loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only what a variable statement's value reads as its body loads is read here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name a function holds is read where that function is called rather than as the body loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name a type holds is read by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key a value spells bare is no name read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name read as the body loads that the body binds nowhere comes from outside the body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The name answered is the first name read that way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The statement answered is the first one above that declaration that runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The statement is answered as its first line rather than whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which names a body binds is read from `bound-names` rather than here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says what a caller does with what is answered.",
    },
  ],
} as const satisfies Module
