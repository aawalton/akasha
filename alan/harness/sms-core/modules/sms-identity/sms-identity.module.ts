import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const smsIdentity = {
  id: "01a05b6f-999d-727d-ab08-10b32928a6d8",
  type: "page-type/module",
  slug: "sms-identity",
  definition: "how code chooses where a text message goes by its sender",
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
  createdAt: "2026-09-01T05:27:15.613Z",
  updatedAt: "2026-10-30T16:09:00.598Z",
} as const satisfies Module
