import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const blazingShield = {
  id: "019e6245-a5f9-7877-a1b8-940c312252cd",
  pageTypeSlug: "temper-skill",
  slug: "blazing-shield",
  title: "Blazing Shield",
  key: "blazing-shield",
  baseName: "Sun Shield",
  description:
    '"Surround yourself with solar rays, applying Minor Maim to nearby enemies for 10 seconds, reducing their damage done by 5%.\\n\\nYou gain a damage shield that absorbs up to 4800 damage for 6 seconds, increasing by 10% for each enemy hit, up to 60%. This ability scales off your Max Health.\\n\\nWhen the shield expires it explodes, dealing 33% of damage absorbed as Magic Damage to nearby enemies."',
  icon: "/esoui/art/icons/ability_templar_blazing_shield.dds",
  esoSkillId: 27530,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "templar-aedric-spear",
  skillType: "active",
  subcategoryId: "templar-aedric-spear",
} as const satisfies TemperSkill
