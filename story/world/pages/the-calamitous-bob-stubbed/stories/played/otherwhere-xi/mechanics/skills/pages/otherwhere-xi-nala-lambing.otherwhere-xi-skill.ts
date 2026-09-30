import type { OtherwhereXiSkill } from "akasha/story/world/pages/the-calamitous-bob-stubbed/stories/played/otherwhere-xi/mechanics/skills/otherwhere-xi-skill.page-type.types.ts"

export const otherwhereXiNalaLambing = {
  id: "01a0eaf9-0fec-73e7-9b29-c5695e8783fe",
  type: "page-type/otherwhere-xi-skill",
  slug: "otherwhere-xi-nala-lambing",
  title: "Lambing",
  world: "world/the-calamitous-bob-stubbed",
  description:
    "Attending a ewe at birth: catching the lamb, clearing its mouth and setting it to suck.",
  character: "character-player/otherwhere-xi-nala",
  rank: "Novice",
  level: 1,
  unrevealed: true,
} as const satisfies OtherwhereXiSkill
