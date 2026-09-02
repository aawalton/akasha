import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const corruptingPollen85845 = {
  id: "01a05fd0-8de9-7fdf-9fb5-b034063387a1",
  pageTypeSlug: "temper-skill",
  slug: "corrupting-pollen-85845",
  title: "Corrupting Pollen",
  key: "corrupting-pollen-85845",
  baseName: "Healing Seed",
  description:
    '"Summon a field of flowers which blooms after |cffffff6|r seconds, healing you and allies in the area for |cffffff11321|r Health.\\n\\nEnemies who enter the field are afflicted with Major Defile and Minor Cowardice, reducing their healing received and damage shield strength by |cffffff12|r% and their Weapon and Spell Damage by |cffffff215|r.\\n\\nAn ally within the field can activate the Harvest synergy, healing for |cffffff10602|r Health over |cffffff5|r seconds."',
  icon: "/esoui/art/icons/ability_warden_007_c.dds",
  esoSkillId: 85845,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "warden-green-balance",
  skillType: "active",
  subcategoryId: "warden-green-balance",
} as const satisfies TemperSkill
