import type { TemperSkill } from "../temper-skill.page-type.ts"

export const pulsar = {
  id: "01a05fd1-2e1f-70e6-b992-05d88934af70",
  pageTypeSlug: "temper-skill",
  slug: "pulsar",
  title: "Pulsar",
  key: "pulsar",
  baseName: "Impulse",
  description:
    '"Release a surge of elemental energy, dealing 1742 Magic Damage to nearby enemies and afflicting them with Minor Mangle, reducing their Max Health by 10% for 10 seconds.\\n\\nFlame Pulsar hits Burning enemies with Pulsar Afterburn, which deals more damage based on their missing Health.\\n\\nFrost Pulsar also provides Minor Protection.\\n\\nStorm Pulsar\'s damage increases based on the number of enemies hit."',
  icon: "/esoui/art/icons/ability_destructionstaff_008_b.dds",
  esoSkillId: 42996,
  isMorph: true,
  learnedLevel: 38,
  lineRankNeeded: 38,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "weapon-destruction-staff",
} as const satisfies TemperSkill
