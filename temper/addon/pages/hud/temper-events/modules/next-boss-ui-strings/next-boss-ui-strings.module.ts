import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const nextBossUiStrings = {
  id: "01a06157-8357-7537-a6bd-307d783c5836",
  type: "page-type/module",
  slug: "next-boss-ui-strings",
  definition: "the words this tracker shows, and the string ids it makes for them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A string id is made at load rather than read from a language file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A district's name opens with the number of its place on the round.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key binding's name is a string id of its own.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here is written in a language other than English.",
    },
  ],
} as const satisfies Module
