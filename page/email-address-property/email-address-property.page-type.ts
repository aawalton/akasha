import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const emailAddressProperty = {
  id: "01a053ef-69a0-7d7d-ac01-f2cb92cc7c63",
  type: "page-type/page-type",
  slug: "email-address-property",
  definition: "a page property with an email address",
  icon: "at-sign",
  extends: ["page-type/page-property"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An address is written in lowercase.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address has no whitespace.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address has one `@`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The `@` divides the mailbox from the domain the mailbox is at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mailbox tagged after `+` reaches the mailbox itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address reaching 254 characters is the longest there is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address states no max.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
} as const satisfies PageType
