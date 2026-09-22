import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const isobelIsobelPenetratingStrikes = {
  id: "019e6484-3876-7084-9250-0cf2b301a826",
  type: "page-type/temper-companion-skill",
  slug: "isobel-isobel-penetrating-strikes",
  key: "isobel-penetrating-strikes",
  title: "Penetrating Strikes",
  icon: "/esoui/art/icons/ability_companion_templar_trained_attacker.dds",
  description:
    "Your Companion attacks three times with a magic spear, dealing $1 Magic Damage to all enemies in front of them with each strike. After their assault, Your Companion grants themselves and nearby allies a boon that increases the damage of their next Light or Heavy Attack by 50%.",
  companionId: "temper-eso-companion/isobel",
  abilityId: 163458,
  skillLineId: "companion-isobel-blazing-might",
  skillType: "temper-skill-type/active",
  validRoles: ["dps", "support"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
