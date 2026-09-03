import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const runeFocus = {
  id: "019e6f53-a67a-78a7-9fb3-92d191b62d65",
  pageTypeSlug: "temper-skill",
  slug: "rune-focus",
  title: "Rune Focus",
  key: "rune-focus",
  baseName: "Rune Focus",
  description:
    '"Create a rune of celestial protection and gain Major Resolve for |cffffff20|r seconds, increasing your Physical Resistance and Spell Resistance by |cffffff5948|r. \\n\\nWhile the rune is active you heal for |cffffff402|r Health every |cffffff1|r second, scaling off your Max Health. Standing within the rune increases the healing done by |cffffff200|r%."',
  icon: "/esoui/art/icons/ability_templar_rune_focus.dds",
  esoSkillId: 22234,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "templar-restoring-light",
  skillType: "active",
  subcategoryId: "templar-restoring-light",
} as const satisfies TemperSkill
