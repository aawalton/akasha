import type { Module } from "../../code-system/module/module.page-type.ts"

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
      statement: "The instant of the discard names the page.",
    },
    {
      invariantKind: "departure",
      statement: "Every colon and dot in that instant becomes a hyphen.",
    },
    {
      invariantKind: "departure",
      statement: "A write that does not land is answered rather than thrown.",
    },
  ],
} as const satisfies Module
