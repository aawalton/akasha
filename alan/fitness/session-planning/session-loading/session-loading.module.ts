import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const sessionLoading = {
  id: "01a0685e-89d5-7d1d-bb68-1be75b2fd805",
  pageTypeSlug: "module",
  slug: "session-loading",
  definition: "the pages a selection is made from, read and narrowed into what it takes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This module is the only module of the package that reads pages.",
    },
    {
      invariantKind: "departure",
      statement: "The pages are read from the checkout this code runs in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here calls the pages system service.",
    },
    {
      invariantKind: "departure",
      statement: "A day with no focus scheduled loads nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A day scheduled as rest has no focus.",
    },
    {
      invariantKind: "departure",
      statement: "A movement whose kit Alan does not have is no candidate.",
    },
    {
      invariantKind: "departure",
      statement: "A set log carries no day, so the day comes from the session it belongs to.",
    },
    {
      invariantKind: "departure",
      statement: "Cardio, mobility and warmup sets are no history to progress from.",
    },
    {
      invariantKind: "departure",
      statement: "A movement is improving unless three sessions in the window say otherwise.",
    },
    {
      invariantKind: "stopgap",
      statement: "The equipment pages state their categories and loads as plain values.",
    },
  ],
} as const satisfies Module
