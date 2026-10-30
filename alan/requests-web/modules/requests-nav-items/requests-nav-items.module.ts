import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const requestsNavItems = {
  id: "01a0c537-baba-7ce4-8b4f-d7076df6a4cd",
  type: "page-type/module",
  slug: "requests-nav-items",
  definition: "the choices the Requests site adds to its own menu",
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
  createdAt: "2026-09-21T18:25:58.970Z",
  updatedAt: "2026-10-30T16:27:02.182Z",
} as const satisfies Module
