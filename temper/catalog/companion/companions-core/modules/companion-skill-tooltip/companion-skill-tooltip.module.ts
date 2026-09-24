import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionSkillTooltip = {
  id: "01a06152-c2d4-7d27-895d-d2dfe67c393f",
  type: "page-type/module",
  slug: "companion-skill-tooltip",
  definition: "a companion skill description with its durations and values filled in",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A nested synergy or delayed effect contributes its own value slot.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Formula effects are collected in the order the skill declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The primary targeting is the first effect with a target.",
    },
  ],
} as const satisfies Module
