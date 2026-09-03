import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const channeledFocus = {
  id: "019e6245-a61a-77df-9b65-ad536aab95f8",
  pageTypeSlug: "temper-skill",
  slug: "channeled-focus",
  title: "Channeled Focus",
  key: "channeled-focus",
  baseName: "Rune Focus",
  description:
    '"Create a rune of celestial protection and gain Major Resolve for 25 seconds, increasing your Physical Resistance and Spell Resistance by 5948. You also recover 242 Magicka every 1 second over the duration.\\n\\nWhile the rune is active you heal for 319 Health every 1 second, scaling off your Max Health. Standing within the rune increases the healing done by 200%."',
  icon: "/esoui/art/icons/ability_templar_channeled_focus.dds",
  esoSkillId: 23998,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "templar-restoring-light",
  skillType: "active",
  subcategoryId: "templar-restoring-light",
} as const satisfies TemperSkill
