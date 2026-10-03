import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const settleCharacter = {
  id: "01a1019b-5c58-776f-96f4-d149ffd1c219",
  type: "page-type/module",
  slug: "settle-character",
  definition: "the one way a settled reading names its character",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading's `character` is the address of a page filed, as `character-player/<slug>`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading naming its character any other way is refused, not spelled again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the page of the story's character that slug or title matches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where no character of the story matches, a refusal names any character page of that slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page sharing a story character's slug, such as a relationship, is refused for that character's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading may name a place or a house where its check scores one as a character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading naming an alias is refused, naming the page the alias is of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading naming no `character` is not judged here.",
    },
  ],
} as const satisfies Module
