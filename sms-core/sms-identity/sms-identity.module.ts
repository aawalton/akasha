import type { Module } from "../../code-system/modules/module.page-type.ts"

export const smsIdentity = {
  id: "01a05b6f-999d-727d-ab08-10b32928a6d8",
  pageTypeSlug: "module",
  slug: "sms-identity",
  definition: "what becomes of a message, decided from the phone it came from",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A phone number is matched on its digits alone.",
    },
    {
      invariantKind: "departure",
      statement: "A leading country code of `1` is dropped before matching.",
    },
    {
      invariantKind: "departure",
      statement: "A sender matching nobody enrolled is discarded.",
    },
    {
      invariantKind: "departure",
      statement: "Permission left unsaid reads as permission withheld.",
    },
    {
      invariantKind: "departure",
      statement: "An enrolled sender without permission is dropped rather than discarded.",
    },
    {
      invariantKind: "departure",
      statement: "An enrolled sender naming no handler is refused rather than sent anywhere.",
    },
  ],
} as const satisfies Module
