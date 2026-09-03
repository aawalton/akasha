import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const radiantWard22182 = {
  id: "019e6f53-a590-7ad5-a8dc-4a7fb6794869",
  pageTypeSlug: "temper-skill",
  slug: "radiant-ward-22182",
  title: "Radiant Ward",
  key: "radiant-ward-22182",
  baseName: "Sun Shield",
  description:
    '"Surround yourself with solar rays, dealing |cffffff6401|r Magic Damage to nearby enemies and applying Minor Maim to them for |cffffff10|r seconds, reducing their damage done by |cffffff5|r%.\\n\\nThe rays then protect you, granting a damage shield that absorbs up to |cffffff7026|r damage for |cffffff6|r seconds, increasing by |cffffff20|r% for each enemy hit, up to |cffffff120|r%. This portion of the ability scales off your Max Health."',
  icon: "/esoui/art/icons/ability_templar_radiant_ward.dds",
  esoSkillId: 22182,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 42,
  skillLineId: "templar-aedric-spear",
  skillType: "active",
  subcategoryId: "templar-aedric-spear",
} as const satisfies TemperSkill
