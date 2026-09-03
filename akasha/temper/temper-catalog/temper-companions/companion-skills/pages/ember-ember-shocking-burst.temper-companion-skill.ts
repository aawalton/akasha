import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const emberEmberShockingBurst = {
  id: "019e6484-3865-7439-85bf-da5c12939357",
  pageTypeSlug: "temper-companion-skill",
  slug: "ember-ember-shocking-burst",
  key: "ember-shocking-burst",
  title: "Shocking Burst",
  icon: "/esoui/art/icons/ability_companion_sorcerer_lightning_splash.dds",
  description:
    "Your Companion creates a nexus of storm energy at the target location, instantly dealing $1 Shock Damage to all enemies in the area and an additional $2 Shock Damage over $$2 seconds.",
  companionId: "ember",
  abilityId: 166085,
  skillLineId: "companion-ember-lightning-caller",
  skillType: "active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
