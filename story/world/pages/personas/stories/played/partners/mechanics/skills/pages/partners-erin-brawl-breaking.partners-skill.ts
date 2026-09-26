import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersErinBrawlBreaking = {
  id: "01a0de4f-5cbd-7dab-9225-88b283a4de49",
  type: "page-type/partners-skill",
  slug: "partners-erin-brawl-breaking",
  title: "Brawl-breaking",
  character: "character-other/partners-erin",
  skill: "world-skill/partners-brawl-breaking",
} as const satisfies PartnersSkill
