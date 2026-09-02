import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedTrickShot = {
  id: "01a05fd0-1d73-7537-b1c3-a7a0f9820b3c",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-trick-shot",
  key: "shared-trick-shot",
  title: "Trick Shot",
  icon: "/esoui/art/icons/ability_companion_bow_005.dds",
  description:
    "Your Companion fires a burst of arrows to pin enemies in front of them, dealing $1 Physical Damage and immobilizing them for $$2 seconds.",
  companionId: "all",
  abilityId: 152701,
  skillLineId: "weapon-bow",
  skillType: "active",
  validRoles: ["dps"],
} as const satisfies TemperCompanionSkill
