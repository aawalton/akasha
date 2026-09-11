import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const alanAuthProvider = {
  id: "01a0655d-dab8-75b5-b6b9-521ef16cadd1",
  type: "module",
  slug: "alan-auth-provider",
  definition: "the signed-in account held for every component below it",
  code: "tsx",
  test: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A session ending clears the account every component below this provider reads.",
    },
    {
      invariantKind: "departure",
      statement: "A module replaced under test is spelled as the code under test spells it.",
    },
    {
      invariantKind: "departure",
      statement: "The account is cleared in a render of its own before the route changes.",
    },
    {
      invariantKind: "departure",
      statement: "Signing out lands on the signed-out route carrying where the person was.",
    },
  ],
} as const satisfies Module
