import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedVanish = {
  id: "019e6484-3833-71ac-8a70-d0f4721f424b",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-vanish",
  key: "shared-vanish",
  title: "Vanish",
  icon: "/esoui/art/icons/ability_companion_armor_medium.dds",
  description:
    "Your Companion disappears in a puff of smoke, healing to full Health and becoming invisible for $$2 seconds.",
  companionId: "all",
  abilityId: 156596,
  skillLineId: "armor-medium",
  skillType: "active",
  validRoles: ["tank"],
  skillEffects: "jsonl",
  castConditions: "jsonl",
} as const satisfies TemperCompanionSkill
