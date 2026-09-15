import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const openingWindow = {
  id: "01a05bc7-9129-7008-8402-c98c706da8be",
  type: "module",
  slug: "opening-window",
  definition: "the span from one opening of Alan's day to the next opening of it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A day opens when the first sleep block starting or running past six the evening before began.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Six in the evening is read on a Utah clock.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The first of two blocks is the block that started earlier.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A block titled anything but sleep is passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A stretch titled rest is sleep not yet known to be sleep and is titled sleep in the morning.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A block ending at or before that hour opens no day.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A block starting at or after six in the evening opens the day after rather than that day.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The blocks a day held are the entries beside that day's page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day's entries are reached through that day's page rather than by a path here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A window closes at the moment the day after opened.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement: "A day with no recorded opening refuses as a value rather than raising.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here invents the moment a day opened.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day refusing a window is a day spanned from the day boundary instead.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day whose next opening is not recorded closes at six that evening in Utah.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The day being lived closes at the moment it is read rather than at a fixed hour.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A spanned window refuses only a day that will not parse.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here asks for a page type but the day's own.",
    },
  ],
} as const satisfies Module
