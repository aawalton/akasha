import type { TemperSkill } from "../temper-skill.page-type.ts"

export const continuousAttack39248 = {
  id: "01a05fd0-43a2-76f0-94f0-db4d578bd6fe",
  pageTypeSlug: "temper-skill",
  slug: "continuous-attack-39248",
  title: "Continuous Attack",
  key: "continuous-attack-39248",
  baseName: "Continuous Attack",
  description:
    '"Increases your Weapon and Spell Damage by |cffffff5|r% and Health, Magicka, and Stamina Recovery by |cffffff10|r% for |cffffff10|r minutes after you capture a Lumber Mill, Farm, Mine, or Keep.\\n\\nGain Gallop at all times, increasing your Mount Speed by |cffffff15|r%."',
  icon: "/esoui/art/icons/ability_weapon_028.dds",
  esoSkillId: 39248,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 3,
  morphIndex: 0,
  rank: 3,
  skillLineId: "alliance-war-assault",
  skillType: "passive",
  subcategoryId: "alliance-war-assault",
} as const satisfies TemperSkill
