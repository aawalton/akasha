import type { Module } from "@akasha/code-system/module"

export const chapterFiling = {
  id: "01a0686c-fd2c-7001-b7a4-465b147c2a2c",
  pageTypeSlug: "module",
  slug: "chapter-filing",
  definition: "a wandering inn chapter filed under the story it belongs to",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The story a chapter is filed under is there before any chapter is filed.",
    },
    {
      invariantKind: "departure",
      statement: "Exactly one page sits at the story's slug.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter already filed is known by the link it was filed under.",
    },
    {
      invariantKind: "departure",
      statement: "An answer holding no chapter is a broken read rather than an empty shelf.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter's own length is counted in words by the story engine's own reckoning.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter whose url states no day is filed without a day rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter's prose is landed in the file beside its page rather than in the page.",
    },
    {
      invariantKind: "departure",
      statement:
        "Chapters are filed by reaching the pages data directly rather than through the pages system service.",
    },
  ],
} as const satisfies Module
