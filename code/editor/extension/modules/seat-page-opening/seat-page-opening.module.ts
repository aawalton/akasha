import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatPageOpening = {
  id: "01a0d49e-b48f-7c61-8d21-ecef84f0479c",
  type: "page-type/module",
  slug: "seat-page-opening",
  definition: "a seat's page on the web, opened in the browser from the seat's row",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's page opens in the browser from its own item in the seat's menu.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A click on a seat's row opens no page in the browser.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's address is built as the web app builds every page's address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row that is no seat opens nothing here.",
    },
  ],
  createdAt: "2026-09-24T18:12:45.839Z",
  updatedAt: "2026-10-19T17:01:16.727Z",
} as const satisfies Module
