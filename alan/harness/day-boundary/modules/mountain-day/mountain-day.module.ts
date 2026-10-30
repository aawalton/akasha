import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mountainDay = {
  id: "01a05c77-31e7-7659-86c4-340d070e0baf",
  type: "page-type/module",
  slug: "mountain-day",
  definition: "how code finds the day of a time in Denver",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A morning day starts at six in the morning.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An evening day turns at six in the evening rather than at midnight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day steps back on the wall clock rather than by a whole day of elapsed time.",
    },
  ],
  createdAt: "2026-09-01T10:15:10.567Z",
  updatedAt: "2026-10-30T15:43:41.027Z",
} as const satisfies Module
