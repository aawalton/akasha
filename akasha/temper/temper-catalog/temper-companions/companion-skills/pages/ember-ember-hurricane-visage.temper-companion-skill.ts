import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const emberEmberHurricaneVisage = {
  id: "01a05fd0-1d7b-7db8-bf90-00b5e301c6b5",
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
