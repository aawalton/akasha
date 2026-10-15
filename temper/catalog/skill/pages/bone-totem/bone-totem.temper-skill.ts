import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const boneTotem = {
  id: "019e6f53-9f75-7454-af1c-76a24fbf035f",
  type: "page-type/temper-skill",
  slug: "bone-totem",
  title: "Bone Totem",
  key: "bone-totem",
  baseName: "Bone Totem",
  description:
    "Summon an effigy of bone at your feet for |cffffff11|r seconds that grants Minor Protection to you and your allies, reducing damage taken by |cffffff5|r%. Enemies in the area are afflicted with Major Cowardice, reducing their Weapon and Spell Damage by |cffffff430|r.\n\nAfter |cffffff2|r seconds, the totem begins fearing nearby enemies every |cffffff2|r seconds, causing them to cower in place for |cffffff4|r seconds.",
  icon: "/esoui/art/icons/ability_necromancer_010.dds",
  esoSkillId: 115093,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "temper-skill-line/necromancer-bone-tyrant",
  skillType: "temper-skill-type/active",
  hashPlace: 148,
  createdAt: "2026-05-28T16:03:31.829Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 11 seconds (Constant)",
    "<<2>> = 5% (Constant)",
    "<<3>> = Major Cowardice (Constant)",
    "<<4>> = 430 (Constant)",
    "<<5>> = 2 seconds (Constant)",
    "<<6>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
