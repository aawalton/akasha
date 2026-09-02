import type { TemperSkill } from "../temper-skill.page-type.ts"

export const burningEmbers20660 = {
  id: "01a05fd0-4382-7b99-9381-5b94580b780d",
  pageTypeSlug: "temper-skill",
  slug: "burning-embers-20660",
  title: "Burning Embers",
  key: "burning-embers-20660",
  baseName: "Searing Strike",
  description:
    '"Slash your foe with a fiery claw, dealing |cffffff4038|r Flame Damage and an additional |cffffff11425|r Flame Damage over |cffffff10|r seconds.\\n\\nYou heal for |cffffff4291|r Health from the initial hit and |cffffff644|r Health each subsequent tick, scaling off your Max Health.\\n\\nThe initial hit always applies the Burning status effect."',
  icon: "/esoui/art/icons/ability_dragonknight_003_b.dds",
  esoSkillId: 20660,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "dragonknight-ardent-flame",
  skillType: "active",
  subcategoryId: "dragonknight-ardent-flame",
} as const satisfies TemperSkill
