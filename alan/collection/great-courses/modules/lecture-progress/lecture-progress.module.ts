import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lectureProgress = {
  id: "01a15000-e667-769d-bcb3-6bca5f9587c4",
  type: "page-type/module",
  slug: "lecture-progress",
  definition: "how far through a course's lectures the site counts Alan",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A lecture is watched where the site would count that lecture watched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lecture within ten seconds of its end is watched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lecture watched counts its whole length, and any other counts what was played.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The next lecture is the first lecture in order that is not watched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A course's length is the sum of the lengths of its lectures.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Lengths and progress are counted in minutes to the hundredth.",
    },
  ],
  createdAt: "2026-10-18T17:13:18.694Z",
  updatedAt: "2026-10-18T17:13:18.694Z",
} as const satisfies Module
