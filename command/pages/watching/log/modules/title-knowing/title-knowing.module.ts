import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const titleKnowing = {
  id: "01a14472-30ff-7002-8a90-0505651851cb",
  type: "page-type/module",
  slug: "title-knowing",
  definition: "the show or film a streaming link names, and what is known of it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A link is read for its provider and the id that provider gives the title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A link to neither Netflix nor Prime Video is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A title is looked up on Wikidata by the provider's id.",
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
  updatedAt: "2026-10-16T11:21:36.767Z",
} as const satisfies Module
