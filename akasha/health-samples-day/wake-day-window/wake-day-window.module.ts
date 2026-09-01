import type { Module } from "../../code-system/module/module.page-type.ts"

export const wakeDayWindow = {
  id: "01a05bc7-9129-7008-8402-c98c706da8be",
  pageTypeSlug: "module",
  slug: "wake-day-window",
  definition: "the span from the moment Alan woke to the moment he woke next",
  code: "ts",
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
      statement: "The blocks a day held are handed in rather than read here.",
    },
    {
      invariantKind: "departure",
      statement: "A window raises rather than reading as the ESO day's own.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a page.",
    },
    {
      invariantKind: "gap",
      statement: "A day's sleep is read from pages akasha carries.",
    },
  ],
} as const satisfies Module
