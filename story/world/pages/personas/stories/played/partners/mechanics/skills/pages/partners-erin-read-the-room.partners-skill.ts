import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersErinReadTheRoom = {
  id: "01a0de4f-5cbd-71bb-87e8-5bdb677d010e",
  type: "page-type/partners-skill",
  slug: "partners-erin-read-the-room",
  title: "Read-the-Room",
  character: "character-other/partners-erin",
  skill: "world-skill/partners-read-the-room",
} as const satisfies PartnersSkill
