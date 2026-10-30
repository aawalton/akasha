import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatReviveIoVerifyDecide = {
  id: "01a0686d-9d5e-700d-914f-8bcfda76a867",
  type: "page-type/module",
  slug: "seat-revive-io-verify-decide",
  definition: "whether a seat that was restarted moves",
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
  createdAt: "2026-09-03T18:00:09.310Z",
  updatedAt: "2026-10-30T14:39:07.945Z",
} as const satisfies Module
