import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const allSharedVanish = {
  id: "019e6484-3833-71ac-8a70-d0f4721f424b",
  type: "page-type/temper-companion-skill",
  slug: "all-shared-vanish",
  key: "shared-vanish",
  title: "Vanish",
  icon: "/esoui/art/icons/ability_companion_armor_medium.dds",
  description:
    "Your Companion disappears in a puff of smoke, healing to full Health and becoming invisible for $$2 seconds.",
  abilityId: 156596,
  skillLineId: "armor-medium",
  skillType: "temper-skill-type/active",
  validRoles: ["tank"],
  skillEffects: "jsonl",
  castConditions: "jsonl",
} as const satisfies TemperCompanionSkill
