import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const beckoningArmor118237 = {
  id: "019e6f53-9eff-76ce-9cce-c9bf9dec646c",
  pageTypeSlug: "temper-skill",
  slug: "beckoning-armor-118237",
  title: "Beckoning Armor",
  key: "beckoning-armor-118237",
  baseName: "Bone Armor",
  description:
    '"Wrap yourself in hardened bone, granting you Major Resolve and Minor Resolve for |cffffff20|r seconds, increasing your Physical Resistance and Spell Resistance by |cffffff5948|r and |cffffff2974|r.\\n\\nWhile active, ranged attackers will be pulled to you once every |cffffff2|r seconds and become taunted for |cffffff15|r seconds if they are not already taunted.\\n\\nIf cast during combat, you can cast a corpse consuming ability on yourself. This effect can occur once every |cffffff10|r seconds."',
  icon: "/esoui/art/icons/ability_necromancer_008_a.dds",
  esoSkillId: 118237,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "active",
  subcategoryId: "necromancer-bone-tyrant",
} as const satisfies TemperSkill
