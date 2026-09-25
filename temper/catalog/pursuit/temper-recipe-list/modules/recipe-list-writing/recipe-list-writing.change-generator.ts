import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const recipeListWriting = {
  id: "01a0d8a0-b10d-7b12-84eb-f5ba98c5c934",
  type: "page-type/change-generator",
  slug: "recipe-list-writing",
  definition:
    "the recipe table every reader of recipes reads, written again from the recipe list pages",
  code: "ts",
  runsAfter: ["change-generator/value-minting"],
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The recipe table is written by a machine rather than by an author.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The recipe list pages are the side the table is read from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A list's place in the table is the display order its page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A recipe's place in its list is the place its row has in the page's recipes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is worked out again only where a recipe list page moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page and body is read through the change rather than off the disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A table already with the body that would be written again is left alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here refuses a landing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here commits.",
    },
  ],
} as const satisfies ChangeGenerator
