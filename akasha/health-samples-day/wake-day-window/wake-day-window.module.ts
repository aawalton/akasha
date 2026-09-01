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
      statement: "A day the store holds no sleep for starts where its ESO day starts.",
    },
    {
      invariantKind: "departure",
      statement: "A block titled anything but sleep is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A block ending outside the ESO day it was read for is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A store that cannot answer throws rather than reading as no sleep at all.",
    },
  ],
} as const satisfies Module
