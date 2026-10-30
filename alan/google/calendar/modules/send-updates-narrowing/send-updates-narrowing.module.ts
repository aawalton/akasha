import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sendUpdatesNarrowing = {
  id: "01a0657c-604c-7000-884b-de941ede99ce",
  type: "page-type/module",
  slug: "send-updates-narrowing",
  definition: "how code reads who a change to a calendar event reaches by email",
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
  updatedAt: "2026-10-30T15:35:00.764Z",
} as const satisfies Module
