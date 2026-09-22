import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const emberEmberQuickFix = {
  id: "019e6484-385e-7e59-ad59-ee3e62563dae",
  type: "page-type/temper-companion-skill",
  slug: "ember-ember-quick-fix",
  key: "ember-quick-fix",
  title: "Quick Fix",
  icon: "/esoui/art/icons/ability_companion_sorcerer_quickfix.dds",
  description:
    "Your Companion patches themselves or an ally with restorative magic, healing for $1 Health.",
  companionId: "temper-eso-companion/ember",
  abilityId: 166018,
  skillLineId: "temper-companion-skill-line/companion-ember-playful-schemer",
  skillType: "temper-skill-type/active",
  validRoles: ["healer", "tank"],
  skillEffects: "jsonl",
  castConditions: "jsonl",
} as const satisfies TemperCompanionSkill
