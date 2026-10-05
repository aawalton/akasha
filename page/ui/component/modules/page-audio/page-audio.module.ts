import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageAudio = {
  id: "01a10dca-cd0b-7a54-b9f9-882d7ce882c3",
  type: "page-type/module",
  slug: "page-audio",
  definition: "the player a page asks to read that page aloud",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A screen with no player offers no page to be read aloud.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is offered to the player where its page type renders its pages as audio.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here knows how a page's audio is made.",
    },
  ],
} as const satisfies Module
