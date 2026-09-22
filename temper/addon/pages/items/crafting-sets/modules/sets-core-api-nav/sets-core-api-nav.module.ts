import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsCoreApiNav = {
  id: "01a061fc-ceed-790c-89ab-adf54c99f601",
  type: "page-type/module",
  slug: "sets-core-api-nav",
  definition: "the world map opened on a zone or panned to a wayshrine",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The item link builder every other module calls is published from this module.",
    },
  ],
} as const satisfies Module
