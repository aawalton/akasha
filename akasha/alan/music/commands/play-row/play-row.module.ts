import type { Module } from "@akasha/code-system/module"

export const playRow = {
  id: "01a063b0-cb34-7000-af1c-727892f4698a",
  pageTypeSlug: "module",
  slug: "play-row",
  definition: "the arithmetic turning one play of a track into the row that play is filed as",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A play of no length runs no minutes.",
    },
    {
      invariantKind: "departure",
      statement: "Minutes are counted to three places.",
    },
    {
      invariantKind: "departure",
      statement: "The ESO day a play lands on is worked out from when the play finished.",
    },
    {
      invariantKind: "departure",
      statement: "A title key drops every character that is no lowercase letter and no digit.",
    },
    {
      invariantKind: "departure",
      statement: "A title key an artist is unknown for is the track name alone.",
    },
    {
      invariantKind: "departure",
      statement: "A priming run scores no first listen.",
    },
    {
      invariantKind: "departure",
      statement: "A resume cursor is one millisecond past the newest play already filed.",
    },
    {
      invariantKind: "departure",
      statement: "A newest play that will not parse leaves the cursor unset.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches Spotify.",
    },
  ],
} as const satisfies Module
