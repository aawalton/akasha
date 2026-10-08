import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sendUpdatesNarrowing = {
  id: "01a0657c-604c-7000-884b-de941ede99ce",
  type: "page-type/module",
  slug: "send-updates-narrowing",
  definition: "the three values a send-updates choice takes, and a raw value narrowed to one",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A send-updates value outside the three is refused rather than defaulted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Saying nothing about send-updates is not asking for `none`.",
    },
  ],
  createdAt: "2026-09-03T04:17:25.068Z",
  updatedAt: "2026-09-22T13:22:14.000Z",
} as const satisfies Module
