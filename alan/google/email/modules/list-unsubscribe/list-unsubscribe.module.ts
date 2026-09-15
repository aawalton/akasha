import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const listUnsubscribe = {
  id: "01a05c0e-3731-779e-88f2-ee109ff37a60",
  type: "page-type/module",
  slug: "list-unsubscribe",
  definition: "getting off a mailing list by the headers the mail has",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A one-click POST that reached the server is named as having reached it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What the list did with that POST is what the server says rather than what we know.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A POST that never came back is named nowhere, because nothing here knows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One-click is used only where the sender says one-click is offered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mailto is fallen back to where one-click is not offered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A one-click POST that does not succeed is refused rather than passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An unsubscribe by mailto names the message it sent on the list it is handed.",
    },
  ],
} as const satisfies Module
