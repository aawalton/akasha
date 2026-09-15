import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatReviveIoVerifyDecide = {
  id: "01a0686d-9d5e-700d-914f-8bcfda76a867",
  type: "page-type/module",
  slug: "seat-revive-io-verify-decide",
  definition: "whether a seat that was revived has moved since, or is wedged where it was left",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat that has advanced on a single signal has advanced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat whose every signal is silent is wedged rather than unread.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Advancement is movement after the revive rather than movement at all.",
    },
  ],
} as const satisfies Module
