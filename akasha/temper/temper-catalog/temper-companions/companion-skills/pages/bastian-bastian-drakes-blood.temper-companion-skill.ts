import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const bastianBastianDrakesBlood = {
  id: "01a05fd0-1d78-7095-8eb1-22b94a832bd0",
  pageTypeSlug: "temper-companion-skill",
  slug: "bastian-bastian-drakes-blood",
  key: "bastian-drakes-blood",
  title: "Drake's Blood",
  icon: "/esoui/art/icons/ability_companion_dragonknight_011.dds",
  description:
    "Your Companion draws on their draconic blood, healing for 25% of their Max Health and reducing their damage taken by 20% for $$2 seconds.",
  companionId: "bastian",
  abilityId: 155268,
  skillLineId: "companion-bastian-draconic-armor",
  skillType: "active",
  validRoles: ["tank"],
  tags: ["max-health-heal-25pct"],
  skillEffects: "jsonl",
  castConditions: "jsonl",
} as const satisfies TemperCompanionSkill
