import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperSkillKind = {
  id: "01a060db-b2bf-75cc-8809-206da241df83",
  type: "page-type/domain",
  slug: "temper-skill-kind",
  definition: "the kinds sorting a skill and the shapes of a skill activation effect",
  parts: [
    "module/scribing-affix-scripts",
    "module/scribing-focus-scripts",
    "module/scribing-signature-scripts",
    "module/skill-activation-effect-types",
    "module/skill-bars",
    "module/skill-buff-debuff-types",
    "module/skill-slots",
    "module/skill-types",
    "module/skill-value-formulas",
    "module/skills-source",
    "module/special-effect-types",
    "module/status-effect-types",
    "module/target-scopes",
    "module/target-types",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill itself is named outside this folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every table here is written out from the skill pages rather than by hand.",
    },
  ],
} as const satisfies Domain
