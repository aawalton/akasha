import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsCoreApiNav = {
  id: "01a061fc-ceed-790c-89ab-adf54c99f601",
  type: "page-type/module",
  slug: "sets-core-api-nav",
  definition: "the world map opened on a zone or wayshrine, or a set's wayshrine travelled to",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The item link builder every other module calls is published from this module.",
    },
  ],
  createdAt: "2026-09-02T11:59:13.133Z",
  updatedAt: "2026-09-25T14:32:32.000Z",
} as const satisfies Module
