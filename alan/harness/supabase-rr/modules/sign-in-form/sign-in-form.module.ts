import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const signInForm = {
  id: "01a08e25-b176-7b8a-a831-12be30fc3c71",
  type: "page-type/module",
  slug: "sign-in-form",
  definition: "the form a reader signs in through",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader signed in goes to the target the url asked for or to the root.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Only a host named here is a target the url may ask for.",
    },
  ],
} as const satisfies Module
