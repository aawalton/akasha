import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const isobelIsobelSpearOfLight = {
  id: "019e6484-3879-7556-82d6-106ef37ef763",
  pageTypeSlug: "temper-companion-skill",
  slug: "isobel-isobel-spear-of-light",
  key: "isobel-spear-of-light",
  title: "Spear of Light",
  icon: "/esoui/art/icons/ability_companion_templar_returning_spear.dds",
  description:
    "Your Companion hurls a barrage of spears made of radiant light at all targets in front of them, dealing $1 Magic Damage and knocking them down for $$3 seconds. This attack ignores the enemy's Resistances.",
  companionId: "isobel",
  abilityId: 163725,
  skillLineId: "companion-isobel-brilliant-shield",
  skillType: "active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
