import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceRunespiteWard = {
  id: "01a05fd2-1e83-729a-944a-1301175e3a76",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-runespite-ward",
  title: "Vengeance Runespite Ward",
  key: "vengeance-runespite-ward",
  baseName: "Vengeance Runespite Ward",
  description:
    '"Like the rune knights of old, summon a shield that absorbs |cffffff14490|r damage for |cffffff6|r seconds.\\n\\nConsume Crux to heal yourself for |cffffff1508|r Health, scaling off your Max Health, per Crux spent."',
  icon: "/esoui/art/icons/ability_arcanist_008.dds",
  esoSkillId: 238249,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-arcanist-soldier-of-apocrypha",
  skillType: "active",
  subcategoryId: "vengeance-arcanist-soldier-of-apocrypha",
} as const satisfies TemperSkill
