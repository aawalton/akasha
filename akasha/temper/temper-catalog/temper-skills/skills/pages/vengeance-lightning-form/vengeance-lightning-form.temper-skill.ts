import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceLightningForm = {
  id: "019e6f53-a930-7858-af14-0fe663bb62e7",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-lightning-form",
  title: "Vengeance Lightning Form",
  key: "vengeance-lightning-form",
  baseName: "Vengeance Lightning Form",
  description:
    '"Manifest yourself as pure lightning, zapping up to 3 nearby enemies with electricity dealing |cffffff5880|r Shock Damage.\\n\\nYou also gain Major Resolve for |cffffff20|r seconds, increasing your Physical Resistance and Spell Resistance by |cffffff5948|r."',
  icon: "/esoui/art/icons/ability_sorcerer_lightning_form.dds",
  esoSkillId: 237954,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-sorcerer-storm-calling",
  skillType: "active",
  subcategoryId: "vengeance-sorcerer-storm-calling",
} as const satisfies TemperSkill
