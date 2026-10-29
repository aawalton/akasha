import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const episodeWatching = {
  id: "01a14472-30ff-7000-ae2e-e214bb58b47c",
  type: "page-type/module",
  slug: "episode-watching",
  definition: "the next episode of a show Alan watched, and the seasons and episodes it needs",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The episode watched is the first episode of the show not yet completed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Episodes are ordered by their season and then by their place in that season.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A season or an episode TMDB lists and the catalogue lacks is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An episode the catalogue holds is matched by its place in its season.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Trakt season TMDB's own seasons lack is laid out from TMDB's grouping.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No season numbered zero is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An episode watched states its whole length as its progress.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A season whose last episode is watched is completed on that day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A season with an episode left to watch is in progress.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A show with an episode watched is in progress unless it is followed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A show logged this way states its TMDB id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A show shelved is given every season and episode TMDB lists, its completed season's watched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A season already completed is given its episodes, each watched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A season already archived is given its episodes, none of them watched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A season given episodes states no length of its own, and no progress where it stated a length.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name TMDB gives that is longer than the page type's title holds is clipped to that length.",
    },
  ],
  createdAt: "2026-10-16T11:21:36.767Z",
  updatedAt: "2026-10-29T16:12:43.174Z",
} as const satisfies Module
