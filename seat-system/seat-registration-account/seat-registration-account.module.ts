import type { Module } from "@akasha/code-system/module"

export const seatRegistrationAccount = {
  id: "01a06949-b281-7f25-beab-a1bc8f5ade76",
  pageTypeSlug: "module",
  slug: "seat-registration-account",
  definition: "the account a seat is enrolled under, read from its page and shown as one line",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat's account is whatever text its page holds under the account key.",
    },
    {
      invariantKind: "departure",
      statement: "A page holding no such text gives no account.",
    },
    {
      invariantKind: "departure",
      statement: "An account that is not there is shown as a dash rather than as an empty line.",
    },
    {
      invariantKind: "departure",
      statement: "The line is the label padded to eight columns followed by the account.",
    },
  ],
} as const satisfies Module
