import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const openingWindow = {
  id: "01a05bc7-9129-7008-8402-c98c706da8be",
  pageTypeSlug: "module",
  type: "module",
  slug: "opening-window",
  definition: "the span from one opening of Alan's day to the next opening of it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A day opens when the first sleep block starting or running past six the evening before began.",
    },
    {
      invariantKind: "departure",
      statement: "Six in the evening is read on a New York clock.",
    },
    {
      invariantKind: "departure",
      statement: "The first of two blocks is the one that started earlier.",
    },
    {
      invariantKind: "departure",
      statement: "A block titled anything but sleep is passed over.",
    },
    {
      invariantKind: "departure",
      statement:
        "A stretch titled rest is sleep not yet known to be sleep and is titled sleep in the morning.",
    },
    {
      invariantKind: "departure",
      statement: "A block ending at or before that hour opens no day.",
    },
    {
      invariantKind: "departure",
      statement:
        "A block starting at or after six in the evening opens the day after rather than that day.",
    },
    {
      invariantKind: "departure",
      statement: "The blocks a day held are the entries beside that day's page.",
    },
    {
      invariantKind: "departure",
      statement: "A day's entries are reached through that day's page rather than by a path here.",
    },
    {
      invariantKind: "departure",
      statement: "A window closes at the moment the day after opened.",
    },
    {
      invariantKind: "departure",
      statement: "A window refuses rather than reading as the ESO day's own.",
    },
    {
      invariantKind: "departure",
      statement: "A day with no recorded opening refuses as a value rather than raising.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here invents the moment a day opened.",
    },
    {
      invariantKind: "departure",
      statement: "A day refusing a window is a day spanned from the day boundary instead.",
    },
    {
      invariantKind: "departure",
      statement: "A day whose next opening is not recorded closes at six that evening in New York.",
    },
    {
      invariantKind: "departure",
      statement: "The day being lived closes at six that evening in New York.",
    },
    {
      invariantKind: "departure",
      statement: "A spanned window refuses only a day that will not parse.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here asks for a page type but the day's own.",
    },
  ],
} as const satisfies Module
