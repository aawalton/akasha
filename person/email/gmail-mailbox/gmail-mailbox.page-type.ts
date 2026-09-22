import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const gmailMailbox = {
  id: "01a06828-59d3-7295-868d-d695a5d5efd8",
  type: "page-type/page-type",
  slug: "gmail-mailbox",
  definition: "a Gmail account the system reads mail from",
  extends: ["page-type/page"],
  parts: ["page-property-entry/processed-messages"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "email-address-property/email-address", required: true, many: false },
    { pageProperty: "page-property-entry/processed-messages", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A mailbox is named for the account rather than for the address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every message a mailbox has been through sits beside that mailbox.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "The address sits under the address a person sends and receives at rather than a key of its own.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
