import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const cruxweaverArmor = {
  id: "01a05fd0-8def-7e66-9149-03a8a19505a0",
  pageTypeSlug: "temper-skill",
  slug: "cruxweaver-armor",
  title: "Cruxweaver Armor",
  key: "cruxweaver-armor",
  baseName: "Fatewoven Armor",
  description:
    '"Forge defiant runic armor around you, granting Major Resolve for 30 seconds, increasing your Armor by 5948.\\n\\nWhile the armor persists, taking damage applies Minor Breach, reducing the Armor of your attacker by 2974 for 6 seconds. Blows against your armor also generate Crux, up to once every 5 seconds."',
  icon: "/esoui/art/icons/ability_arcanist_009_a.dds",
  esoSkillId: 40185908,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "arcanist-soldier-of-apocrypha",
  skillType: "active",
  subcategoryId: "arcanist-soldier-of-apocrypha",
} as const satisfies TemperSkill
