import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const honorTheDead = {
  id: "019e6245-a6a7-702f-9d79-0bc1dbfd5ede",
  pageTypeSlug: "temper-skill",
  slug: "honor-the-dead",
  title: "Honor the Dead",
  key: "honor-the-dead",
  baseName: "Rushed Ceremony",
  description:
    '"Beacon your inner light, healing yourself or a wounded ally in front of you for 3485 Health. \\n\\nHealing anyone who is below 75% Health restores 18% of the ability\'s cost every 2 seconds over 6 seconds as Magicka."',
  icon: "/esoui/art/icons/ability_templar_honor_the_dead.dds",
  esoSkillId: 24213,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "templar-restoring-light",
  skillType: "active",
  subcategoryId: "templar-restoring-light",
} as const satisfies TemperSkill
