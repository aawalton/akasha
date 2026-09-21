import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const wanderingInnWiki = {
  id: "01a0b79b-285f-7808-bb33-c1a4368acf58",
  type: "page-type/domain",
  slug: "wandering-inn-wiki",
  definition: "a fan wiki covering everything in The Wandering Inn",
  parts: ["router-app/wandering-inn-wiki-web"],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The author allows a fan wiki the names and the scenes, and no text copied from the work.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No chapter of the story's own prose is served here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A quotation of the work sits in an entry, and this wiki serves no entry.",
    },
  ],
} as const satisfies Domain
