import type { Module } from "../../code-system/modules/module.page-type.ts"

export const smsDiscard = {
  id: "01a05b73-2ec7-73b1-b1c2-25548df34716",
  pageTypeSlug: "module",
  slug: "sms-discard",
  definition: "a turned-away inbound SMS written down as a page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every colon and dot in a discard's instant becomes a hyphen.",
    },
    {
      invariantKind: "departure",
      statement: "A turned-away message is written nowhere.",
    },
    {
      invariantKind: "departure",
      statement: "The loss reaches the logs before the loss is answered.",
    },
    {
      invariantKind: "departure",
      statement: "The loss names the sender.",
    },
    {
      invariantKind: "departure",
      statement: "The loss names why the message was turned away.",
    },
    {
      invariantKind: "departure",
      statement: "The loss names when the message was turned away.",
    },
    {
      invariantKind: "departure",
      statement: "A loss is answered rather than thrown.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a page.",
    },
    {
      invariantKind: "gap",
      statement: "An SMS this system turns away is kept somewhere.",
    },
  ],
} as const satisfies Module
