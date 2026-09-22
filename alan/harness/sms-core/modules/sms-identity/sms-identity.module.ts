import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const smsIdentity = {
  id: "01a05b6f-999d-727d-ab08-10b32928a6d8",
  type: "page-type/module",
  slug: "sms-identity",
  definition: "what becomes of a message, decided from its sending phone",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A phone number is matched on its digits alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A leading country code of `1` is dropped before matching.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sender matching nobody enrolled is discarded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Permission left unsaid reads as permission withheld.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An enrolled sender without permission is dropped rather than discarded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An enrolled sender naming no handler is refused rather than sent anywhere.",
    },
  ],
} as const satisfies Module
