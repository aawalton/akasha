import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const concealedWeapon = {
  id: "01a05fd0-439d-7c48-a539-247e1b7d3cc2",
  pageTypeSlug: "temper-skill",
  slug: "concealed-weapon",
  title: "Concealed Weapon",
  key: "concealed-weapon",
  baseName: "Veiled Strike",
  description:
    '"Slash an enemy, dealing 2556 Magic Damage. \\n\\nIf you strike an enemy from their flank you set them Off Balance.\\n\\nWhen you leave Sneak or invisibility while in combat, increase your damage done with this ability by 10% for 15 seconds.\\n\\nWhile slotted on either bar, you gain Minor Expedition, increasing your Movement Speed by 15%."',
  icon: "/esoui/art/icons/ability_nightblade_002_b.dds",
  esoSkillId: 36244,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "nightblade-assassination",
  skillType: "active",
  subcategoryId: "nightblade-assassination",
} as const satisfies TemperSkill
