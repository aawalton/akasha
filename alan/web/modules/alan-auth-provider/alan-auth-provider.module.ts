import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const alanAuthProvider = {
  id: "01a0655d-dab8-75b5-b6b9-521ef16cadd1",
  type: "page-type/module",
  slug: "alan-auth-provider",
  definition: "the signed-in account held for every component below it",
  code: "tsx",
  test: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The reader the layout read is the owner the pages store is set to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A signed-in reader's pages store follows its pages on the site's stream.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The account id a person page states is what every component below reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A module replaced under test is spelled as the code under test spells it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This provider watches no session and sends nobody to a sign-in.",
    },
  ],
} as const satisfies Module
