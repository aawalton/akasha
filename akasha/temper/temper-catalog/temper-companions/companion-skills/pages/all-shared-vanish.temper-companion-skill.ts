import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedVanish = {
  id: "01a05fd0-1d74-7a86-82ab-098d417db2c7",
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
} as const satisfies TemperCompanionSkill
