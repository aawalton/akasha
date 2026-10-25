import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const titleKnowing = {
  id: "01a14472-30ff-7002-8a90-0505651851cb",
  type: "page-type/module",
  slug: "title-knowing",
  definition: "the show or film a link names, and what is known of it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A link is read for its provider and the id that provider gives the title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A link to none of Netflix, Prime Video and TMDB is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A TMDB link says whether it names a film or a show.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A TMDB title is looked up on TMDB by its id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Any other title is looked up on Wikidata by the provider's id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Prime Video title Wikidata does not hold is read from its Prime Video page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A show Wikidata holds is known by the id TMDB gives it.",
    },
  ],
  createdAt: "2026-10-16T11:21:36.767Z",
  updatedAt: "2026-10-25T23:37:47.839Z",
} as const satisfies Module
