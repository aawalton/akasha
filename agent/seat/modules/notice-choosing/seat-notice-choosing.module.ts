import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatNoticeChoosing = {
  id: "01a16ff8-661e-766e-b2d7-8ce3fc97620b",
  type: "page-type/module",
  slug: "seat-notice-choosing",
  definition: "the notice a person chose for a seat, read from that person's page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The phone push and the desktop notification read one choice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice the page states wrongly is read as no notice stated.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Choosing a notice for a seat leaves every other seat's notice as it was.",
    },
  ],
  createdAt: "2026-10-24T22:11:52.478Z",
  updatedAt: "2026-10-24T22:11:52.478Z",
} as const satisfies Module
