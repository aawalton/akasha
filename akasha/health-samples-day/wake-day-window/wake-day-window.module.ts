import type { Module } from "../../code-system/modules/module.page-type.ts"

export const wakeDayWindow = {
  id: "01a05bc7-9129-7008-8402-c98c706da8be",
  pageTypeSlug: "module",
  slug: "wake-day-window",
  definition: "the span from the moment Alan woke to the moment he woke next",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The moment Alan woke is the earliest sleep block ending inside the ESO day.",
    },
    {
      invariantKind: "departure",
      statement: "A block titled anything but sleep is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A block ending outside the ESO day the block was read for is passed over.",
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
      statement: "A window closes at the moment Alan woke on the day after.",
    },
    {
      invariantKind: "departure",
      statement: "A window refuses rather than reading as the ESO day's own.",
    },
    {
      invariantKind: "departure",
      statement: "A day with no recorded wake refuses as a value rather than raising.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here invents the moment Alan woke.",
    },
    {
      invariantKind: "departure",
      statement: "A day refusing a window is a day spanned from the day boundary instead.",
    },
    {
      invariantKind: "departure",
      statement: "Which of the two a day was is answered here rather than by each figure's writer.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here asks for a page type but the day's own.",
    },
  ],
} as const satisfies Module
