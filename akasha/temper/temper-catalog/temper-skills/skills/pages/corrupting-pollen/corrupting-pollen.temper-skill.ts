import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const corruptingPollen = {
  id: "019e6245-a623-766b-b15f-bffe842b7cc1",
  pageTypeSlug: "temper-skill",
  slug: "corrupting-pollen",
  title: "Corrupting Pollen",
  key: "corrupting-pollen",
  baseName: "Healing Seed",
  description:
    '"Summon a field of flowers which blooms after 6 seconds, healing you and allies in the area for 3600 Health.\\n\\nEnemies who enter the field are afflicted with Major Defile and Minor Cowardice, reducing their healing received and damage shield strength by 12% and their Weapon and Spell Damage by 215.\\n\\nAn ally within the field can activate the Harvest synergy, healing for 3372 Health over 5 seconds."',
  icon: "/esoui/art/icons/ability_warden_007_c.dds",
  esoSkillId: 93810,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "warden-green-balance",
  skillType: "active",
  subcategoryId: "warden-green-balance",
} as const satisfies TemperSkill
