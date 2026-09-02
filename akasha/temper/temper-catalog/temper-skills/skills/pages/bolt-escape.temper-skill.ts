import type { TemperSkill } from "../temper-skill.page-type.ts"

export const boltEscape = {
  id: "01a05fd0-4375-76ad-a8b2-65bc010263f8",
  pageTypeSlug: "temper-skill",
  slug: "bolt-escape",
  title: "Bolt Escape",
  key: "bolt-escape",
  baseName: "Bolt Escape",
  description:
    '"Transform yourself into pure energy and flash forward, stunning enemies near your final location for |cffffff3|r seconds. \\n\\nThis effect cannot be blocked.\\n\\nCasting again within |cffffff4|r seconds costs |cffffff33|r% more Magicka."',
  icon: "/esoui/art/icons/ability_sorcerer_bolt_escape.dds",
  esoSkillId: 23234,
  isMorph: false,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "sorcerer-storm-calling",
  skillType: "active",
  subcategoryId: "sorcerer-storm-calling",
} as const satisfies TemperSkill
