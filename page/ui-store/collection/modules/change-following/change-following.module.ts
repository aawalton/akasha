import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const changeFollowing = {
  id: "01a0d4c1-afcd-746f-af00-f53c78d3005b",
  type: "page-type/module",
  slug: "change-following",
  definition: "the one stream a browser holds open for changes to the pages and lists it shows",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page store holds one stream open however many pages and lists it shows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each thing followed is named by a key the browser chooses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A thing followed twice under one key is followed until it is let go twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What is followed is said again whole shortly after it changes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key is live only once the stream has taken it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stream lost leaves no key live until a stream takes the keys again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stream taking the keys after one was lost reads everything followed again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stream closed for good is opened again after a wait that doubles to a minute.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stream refusing what is followed is opened again.",
    },
  ],
} as const satisfies Module
