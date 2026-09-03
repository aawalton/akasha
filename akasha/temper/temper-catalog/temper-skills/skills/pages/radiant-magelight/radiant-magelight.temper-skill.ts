import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const radiantMagelight = {
  id: "019e6238-c2fb-7990-9efa-a51cfe115fc5",
  pageTypeSlug: "temper-skill",
  slug: "radiant-magelight",
  title: "Radiant Magelight",
  key: "radiant-magelight",
  baseName: "Magelight",
  description:
    '"Summon a mote of magelight, revealing stealthed and invisible enemies around you for 5 seconds. Exposed enemies cannot return to stealth or invisibility for 4 seconds.\\n\\nWhile slotted you gain Major Savagery and Prophecy, increasing your Weapon and Spell Critical rating by 2629. You also prevent the stun from stealth attacks for you and nearby allies."',
  icon: "/esoui/art/icons/ability_mageguild_002_a.dds",
  esoSkillId: 42455,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 12,
  skillLineId: "guild-mages-guild",
  skillType: "active",
  subcategoryId: "guild-mages-guild",
  effects: "jsonl",
} as const satisfies TemperSkill
