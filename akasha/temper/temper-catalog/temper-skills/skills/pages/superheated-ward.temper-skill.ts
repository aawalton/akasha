import type { TemperSkill } from "../temper-skill.page-type.ts"

export const superheatedWard = {
  id: "01a05fd1-d254-754b-b51c-93d3b7f6e82c",
  pageTypeSlug: "temper-skill",
  slug: "superheated-ward",
  title: "Superheated Ward",
  key: "superheated-ward",
  baseName: "Superheated Ward",
  description:
    '"Roil the air around you or an ally, granting a damage shield that absorbs up to |cffffff9859|r for |cffffff6|r seconds.\\n\\nThis ability scales off the higher of your Max Magicka or Stamina and is capped at |cffffff50|r% of the target\'s Max Health."',
  icon: "/esoui/art/icons/ability_dragonknight_013.dds",
  esoSkillId: 29032,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "dragonknight-earthen-heart",
  skillType: "active",
  subcategoryId: "dragonknight-earthen-heart",
} as const satisfies TemperSkill
