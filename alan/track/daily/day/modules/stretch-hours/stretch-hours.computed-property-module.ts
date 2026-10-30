import type { ComputedPropertyModule } from "akasha/page/computed-property-module/computed-property-module.page-type.types.ts"

export const stretchHours = {
  id: "01a0b6aa-a9c0-72ae-b607-ee80f944f40e",
  type: "page-type/computed-property-module",
  slug: "stretch-hours",
  definition: "the hours a span of time has run",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A stretch with an end runs from its start to that end.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stretch with no end runs from its start to now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stretch with no end on an earlier day runs to the midnight ending that day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day whose date is unreadable counts a stretch with no end to now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stretch beginning after the instant it is counted to ran no hours.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stretch whose start cannot be read is no reading rather than no hours.",
    },
  ],
  createdAt: "2026-09-18T22:37:13.024Z",
  updatedAt: "2026-10-30T16:33:52.681Z",
} as const satisfies ComputedPropertyModule
