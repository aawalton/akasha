import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const moltenWeapons = {
  id: "019e6f53-a492-7ea0-8131-cda5df000069",
  pageTypeSlug: "temper-skill",
  slug: "molten-weapons",
  title: "Molten Weapons",
  key: "molten-weapons",
  baseName: "Molten Weapons",
  description:
    '"Charge you and your grouped allies\' weapons with volcanic power to gain Major Brutality and Sorcery, increasing your Weapon and Spell Damage by |cffffff20|r% for |cffffff30|r seconds.\\n\\nWhile active, dealing damage with Light and Heavy Attacks causes an additional |cffffff1562|r Flame Damage, up to once every |cffffff2|r seconds."',
  icon: "/esoui/art/icons/ability_dragonknight_015.dds",
  esoSkillId: 29043,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "dragonknight-earthen-heart",
  skillType: "active",
  subcategoryId: "dragonknight-earthen-heart",
} as const satisfies TemperSkill
