import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionSkillLineReading = {
  id: "01a0cabd-d447-7412-a12f-936a9c39f7e3",
  type: "page-type/module",
  slug: "companion-skill-line-reading",
  definition: "every companion skill line, read from the pages that hold them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill line is read from its page rather than from a copy in code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line no one companion has states no companion.",
    },
  ],
  createdAt: "2026-09-22T20:10:33.415Z",
  updatedAt: "2026-09-22T20:11:15.000Z",
} as const satisfies Module
