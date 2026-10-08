import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const emberEmberShockingBurst = {
  id: "019e6484-3865-7439-85bf-da5c12939357",
  type: "page-type/temper-companion-skill",
  slug: "ember-ember-shocking-burst",
  key: "ember-shocking-burst",
  title: "Shocking Burst",
  icon: "/esoui/art/icons/ability_companion_sorcerer_lightning_splash.dds",
  description:
    "Your Companion creates a nexus of storm energy at the target location, instantly dealing $1 Shock Damage to all enemies in the area and an additional $2 Shock Damage over $$2 seconds.",
  companionId: "temper-eso-companion/ember",
  abilityId: 166085,
  skillLineId: "temper-companion-skill-line/companion-ember-lightning-caller",
  skillType: "temper-skill-type/active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
  createdAt: "2026-05-26T13:40:47.333Z",
  updatedAt: "2026-09-22T20:39:10.000Z",
} as const satisfies TemperCompanionSkill
