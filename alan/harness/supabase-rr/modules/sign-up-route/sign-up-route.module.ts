import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const signUpRoute = {
  id: "01a090ae-514d-7335-bf9d-a3f3b7b9c4c4",
  type: "page-type/module",
  slug: "sign-up-route",
  definition: "where a reader asking to sign up is sent",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader asking for the sign-up path is sent to signing in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No account is opened here.",
    },
  ],
} as const satisfies Module
