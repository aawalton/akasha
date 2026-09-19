import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const trackTyping = {
  id: "01a0c1f2-8a44-7b10-9e57-2c6d0f83a41b",
  type: "page-type/module",
  slug: "track-typing",
  definition: "the kind of recording a released title says a track is",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A kind is read from a bracketed aside and from the tail after the first dash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tail after the first dash runs to the end however many dashes follow.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A word outside an aside and outside that tail names no kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A title naming more than one kind takes the first kind this states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A live take of a remix is a remix, because the remix is what was played.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A medley and a reprise are pieces of their own rather than kinds of recording.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the release a track sits on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deluxe release carrying both studio and live takes is why.",
    },
  ],
} as const satisfies Module
