import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sender = {
  id: "01a05bcd-25e3-7ad8-94f5-51861579256d",
  type: "page-type/module",
  slug: "sender",
  definition: "how code reads the email address of the sender of an email",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An address inside angle brackets wins over the text around that address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address is lowercased before anything compares the address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address with no separator has an empty domain.",
    },
  ],
  createdAt: "2026-09-01T07:09:26.371Z",
  updatedAt: "2026-10-30T15:49:05.172Z",
} as const satisfies Module
