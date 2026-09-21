import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const unheardPicking = {
  id: "01a0c4eb-23e1-79fd-ad89-53de5dd968d6",
  type: "page-type/module",
  slug: "unheard-picking",
  definition: "the tracks a followed artist made that Alan has not heard",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A track Alan has heard is never picked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track whose artist Alan does not follow is never picked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track Spotify does not name is never picked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One track of a track key is picked and the rest of that key are not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track stating no track key is never folded into a key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The track picked for a key is the first that key reaches in order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Tracks of one artist are ordered by release, then disc, then position.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Artists take turns, so no artist runs twice before every artist has run once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Artists take their turns in the order of their slugs.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the page store.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the network.",
    },
  ],
} as const satisfies Module
