import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const requestsNavCommand = {
  id: "01a0c537-baaa-710a-91ba-8d1a3c37ca13",
  type: "page-type/module",
  slug: "requests-nav-command",
  definition: "the commands offered beside the Requests site's navigation items",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The commands are the nav pages the sidebar draws, as those pages are now.",
    },
  ],
} as const satisfies Module
