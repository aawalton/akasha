import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatRegistrationAccount = {
  id: "01a06949-b281-7f25-beab-a1bc8f5ade76",
  type: "page-type/module",
  slug: "seat-registration-account",
  definition: "how code reads the model account of a seat",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's account is the slug of the model account its page names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page with no such text gives no account.",
    },
  ],
  createdAt: "2026-09-03T22:00:32.641Z",
  updatedAt: "2026-09-25T18:02:16.000Z",
} as const satisfies Module
