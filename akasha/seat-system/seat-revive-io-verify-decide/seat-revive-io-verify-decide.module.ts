import type { Module } from "@akasha/code-system/module"

export const seatReviveIoVerifyDecide = {
  id: "01a0686d-9d5e-700d-914f-8bcfda76a867",
  pageTypeSlug: "module",
  slug: "seat-revive-io-verify-decide",
  definition: "whether a seat that was revived has moved since, or is wedged where it was left",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat that has advanced on any of its signals has advanced.",
    },
    {
      invariantKind: "departure",
      statement: "A seat whose every signal is silent is wedged rather than unread.",
    },
    {
      invariantKind: "departure",
      statement: "Advancement is movement after the revive rather than movement at all.",
    },
  ],
} as const satisfies Module
