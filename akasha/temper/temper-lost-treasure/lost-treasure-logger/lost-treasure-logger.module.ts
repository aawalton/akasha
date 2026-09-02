import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lostTreasureLogger = {
  id: "01a06141-800b-7606-b3fe-3a8d91998976",
  pageTypeSlug: "module",
  slug: "lost-treasure-logger",
  definition: "a named log channel for each part of the add-on, over LibDebugLogger",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A log level is the string the logging library uses rather than a number.",
    },
  ],
} as const satisfies Module
