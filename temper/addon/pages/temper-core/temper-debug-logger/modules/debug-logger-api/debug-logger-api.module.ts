import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const debugLoggerApi = {
  id: "01a06061-408c-7ae0-8ee1-8ec6defab7e7",
  type: "page-type/module",
  slug: "debug-logger-api",
  definition: "the functions the library hands to every other addon",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Calling the library table itself makes a logger.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A caller may hand the library table in as the first argument or leave the argument out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The API version this states is two.",
    },
  ],
  createdAt: "2026-09-02T04:29:41.388Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
