import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const moltenArmaments31888 = {
  id: "019e6f53-a491-7821-abc6-58347e96eeb2",
  pageTypeSlug: "temper-skill",
  slug: "molten-armaments-31888",
  title: "Molten Armaments",
  key: "molten-armaments-31888",
  baseName: "Molten Weapons",
  description:
    '"Charge you and your grouped allies\' weapons with volcanic power to gain Major Brutality and Sorcery, increasing your Weapon and Spell Damage by |cffffff20|r% for |cffffff30|r seconds.\\n\\nWhile active, dealing damage with Light and Heavy Attacks causes an additional |cffffff1562|r Flame Damage, up to once every |cffffff1.5|r seconds.\\n\\nYou also gain Empower for the duration, increasing the damage of your Heavy Attacks against monsters by |cffffff70|r%."',
  icon: "/esoui/art/icons/ability_dragonknight_015_b.dds",
  esoSkillId: 31888,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "dragonknight-earthen-heart",
  skillType: "active",
  subcategoryId: "dragonknight-earthen-heart",
} as const satisfies TemperSkill
