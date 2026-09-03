import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const innerLight40478 = {
  id: "019e6f53-a37b-75bd-b1b6-21702ce023fd",
  pageTypeSlug: "temper-skill",
  slug: "inner-light-40478",
  title: "Inner Light",
  key: "inner-light-40478",
  baseName: "Magelight",
  description:
    '"Summon a mote of magelight, revealing stealthed and invisible enemies around you for |cffffff5|r seconds. Exposed enemies cannot return to stealth or invisibility for |cffffff4|r seconds.\\n\\nWhile slotted you gain Major Savagery and Prophecy, increasing your Weapon and Spell Critical rating by |cffffff2629|r and your Max Magicka is increased by |cffffff5|r%."',
  icon: "/esoui/art/icons/ability_mageguild_002_b.dds",
  esoSkillId: 40478,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 2,
  skillLineId: "guild-mages-guild",
  skillType: "active",
  subcategoryId: "guild-mages-guild",
} as const satisfies TemperSkill
