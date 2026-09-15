import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const emailAddressProperty = {
  id: "01a053ef-69a0-7d7d-ac01-f2cb92cc7c63",
  type: "page-type",
  slug: "email-address-property",
  definition: "a page property with an email address",
  extends: ["page-type/page-property"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An address is written in lowercase.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An address has no whitespace.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An address has one `@`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The `@` divides the mailbox from the domain the mailbox is at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A mailbox tagged after `+` reaches the mailbox itself.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An address reaching 254 characters is the longest there is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An address states no max.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
} as const satisfies PageType
