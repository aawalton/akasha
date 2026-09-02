import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const isobelIsobelEnchanted = {
  id: "01a05fd0-1d7e-7246-9086-7e2a3e952b6d",
  pageTypeSlug: "temper-companion-skill",
  slug: "isobel-isobel-enchanted",
  key: "isobel-enchanted",
  title: "Cunning",
  icon: "/esoui/art/icons/ability_companion_templar_cunning.dds",
  description: "Decreases ability cooldowns by 3% and damage taken by 3%.",
  companionId: "isobel",
  abilityId: 169474,
  skillLineId: "companion-isobel",
  skillType: "passive",
  validRoles: ["tank"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
