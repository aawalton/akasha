import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatReplyNotifying = {
  id: "01a16f84-6063-74ba-b472-de2d763b51bf",
  type: "page-type/module",
  slug: "seat-reply-notifying",
  definition:
    "the desktop notification a seat's page shows when a reply ends while the page is away",
  code: "tsx",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the page of a seat answering to several persons notifies.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The browser is asked to notify only when the person reading presses to be notified.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reply notifies once, when the turn answering it ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reply notifies only while the page is hidden or the window is not focused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn already ended when the page opened notifies nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notification is titled with the seat's name and says the start of the reply.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Clicking a notification brings the seat's page forward.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A browser that has no notifications shows no way to turn them on.",
    },
  ],
  createdAt: "2026-10-24T20:05:08.835Z",
  updatedAt: "2026-10-24T20:05:08.835Z",
} as const satisfies Module
