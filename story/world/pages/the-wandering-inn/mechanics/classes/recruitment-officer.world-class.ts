import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const recruitmentOfficer = {
  id: "01a06586-0a1f-7b10-ba74-d19f8c85f08f",
  type: "page-type/world-class",
  slug: "recruitment-officer",
  title: "Recruitment Officer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
