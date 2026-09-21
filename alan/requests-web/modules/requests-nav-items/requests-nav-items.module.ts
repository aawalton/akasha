import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const requestsNavItems = {
  id: "01a0c537-baba-7ce4-8b4f-d7076df6a4cd",
  type: "page-type/module",
  slug: "requests-nav-items",
  definition: "the navigation items the Requests site offers of its own",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The Requests site offers no navigation item of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every item in the Requests sidebar is a nav page whose app slug is `requests`.",
    },
  ],
} as const satisfies Module
