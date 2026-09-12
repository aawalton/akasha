import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const listUnsubscribe = {
  id: "01a05c0e-3731-779e-88f2-ee109ff37a60",
  type: "module",
  slug: "list-unsubscribe",
  definition: "getting off a mailing list by the headers the mail has",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A one-click POST that reached the server is named as having reached it.",
    },
    {
      invariantKind: "departure",
      statement:
        "What the list did with that POST is what the server says rather than what we know.",
    },
    {
      invariantKind: "departure",
      statement: "A POST that never came back is named nowhere, because nothing here knows.",
    },
    {
      invariantKind: "departure",
      statement: "One-click is used only where the sender says one-click is offered.",
    },
    {
      invariantKind: "departure",
      statement: "A mailto is fallen back to where one-click is not offered.",
    },
    {
      invariantKind: "departure",
      statement: "A one-click POST that does not succeed is refused rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "An unsubscribe by mailto names the message it sent on the list it is handed.",
    },
  ],
} as const satisfies Module
