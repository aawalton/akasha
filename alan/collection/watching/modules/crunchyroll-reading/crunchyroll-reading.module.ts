import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const crunchyrollReading = {
  id: "01a18818-57d5-7a83-b290-e610ce39c59a",
  type: "page-type/module",
  slug: "crunchyroll-reading",
  definition: "how code reads the episode or the movie Crunchyroll plays in a browser",
  code: "ts",
  test: "ts",
  runsInABrowser: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The page's title is read before the page's data, and the page's data after it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A title naming no episode leaves the page's own metadata read for the series and the number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A series naming a season has that season taken off the series.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page naming no show records nothing rather than naming a show of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page naming an episode states its number in its season and its title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page naming no episode number is a film.",
    },
  ],
  createdAt: "2026-10-29T14:37:39.156Z",
  updatedAt: "2026-10-30T16:29:38.028Z",
} as const satisfies Module
