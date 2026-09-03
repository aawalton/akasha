import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const emberEmberHurricaneVisage = {
  id: "019e6484-385c-7fe5-b2a7-27779712886f",
  pageTypeSlug: "temper-companion-skill",
  slug: "ember-ember-hurricane-visage",
  key: "ember-hurricane-visage",
  title: "Hurricane Visage",
  icon: "/esoui/art/icons/ability_companion_sorcerer_lightning_form.dds",
  description:
    "Your Companion manifests themselves as pure lightning, zapping nearby enemies with electricity dealing $1 Shock Damage over $$2 seconds. While in this form their damage taken is reduced by 20%.",
  companionId: "ember",
  abilityId: 165860,
  skillLineId: "companion-ember-mischievous-caster",
  skillType: "active",
  validRoles: ["dps", "tank"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
