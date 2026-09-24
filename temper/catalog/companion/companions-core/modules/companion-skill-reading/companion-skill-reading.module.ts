import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionSkillReading = {
  id: "01a0cabe-eeb5-798e-ad6e-6af26562c2ee",
  type: "page-type/module",
  slug: "companion-skill-reading",
  definition: "every companion skill, read from the pages that hold them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill is read from its page rather than from a copy in code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill every companion shares states no companion.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An effect drops the id its own row carries, which names the row and nothing more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An effect names its metric by the slug of the metric's page rather than its address.",
    },
  ],
} as const satisfies Module
