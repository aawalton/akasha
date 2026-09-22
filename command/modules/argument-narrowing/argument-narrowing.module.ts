import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const argumentNarrowing = {
  id: "01a069da-b9b3-7c68-b5aa-1d269342aa9e",
  type: "page-type/module",
  slug: "argument-narrowing",
  definition: "a value from outside narrowed to the type a command needs",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value of the wrong type ends the command.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the place the value is in.",
    },
  ],
} as const satisfies Module
