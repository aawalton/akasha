import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const courseRelinking = {
  id: "01a1509c-8378-7539-877e-0e6f513d993e",
  type: "page-type/module",
  slug: "course-relinking",
  definition: "a course already filed pointed at the link the catalogue gives that course now",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A course's link is the link the catalogue gives that course on the latest read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A course the catalogue no longer lists keeps the link that course has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a course whose link differs is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every course whose link differs is written in one write.",
    },
  ],
  createdAt: "2026-10-18T20:03:16.983Z",
  updatedAt: "2026-10-18T20:03:16.983Z",
} as const satisfies Module
