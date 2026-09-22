import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const requestsAppShell = {
  id: "01a0c537-ba8c-76cf-8c53-2c9af0c65345",
  type: "page-type/module",
  slug: "requests-app-shell",
  definition: "the Requests site's page frame",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The sidebar carries the nav pages whose app slug is `requests` and nothing else.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This frame has no bottom section.",
    },
  ],
} as const satisfies Module
