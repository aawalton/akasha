import type { Module } from "../../code-system/modules/module.page-type.ts"

export const argumentNarrowing = {
  id: "01a069da-b9b3-7c68-b5aa-1d269342aa9e",
  pageTypeSlug: "module",
  slug: "argument-narrowing",
  definition: "a value from outside read as the type a command needs",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value of the wrong type ends the command.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the place the value stands in.",
    },
  ],
} as const satisfies Module
