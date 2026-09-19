import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chapterFiling = {
  id: "01a0686c-fd2c-7001-b7a4-465b147c2a2c",
  type: "page-type/module",
  slug: "chapter-filing",
  definition: "a wandering inn chapter filed under the story it belongs to",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The story a chapter is filed under is there before any chapter is filed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Exactly one page sits at the story's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chapter is filed under the story's qualified address rather than the story's slug alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The chapters already filed are looked for under the address those chapters were filed under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter already filed is known by the link that chapter was filed under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That link is read off the chapter's record of the wandering inn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter filed here states its link as one record of the wandering inn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer holding no chapter is a broken read rather than an empty shelf.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter's own length is counted in words by the story engine's own reckoning.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter states the unit its length is counted in as an address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter whose url states no day is filed without a day rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter's prose is landed in the file beside its page rather than in the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The change adding a file lands the page and the prose rather than an edit composed here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page goes up through the change that works out the kind of the path handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's id is worked out by that change rather than by the landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Chapters are filed by reaching the pages data directly rather than through the pages system service.",
    },
  ],
} as const satisfies Module
