import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveReaderOfRecords = {
  id: "01a0e9f6-d518-7034-80f4-a6ec417e0e13",
  type: "page-type/world-skill",
  slug: "super-supportive-reader-of-records",
  title: "Reader of Records",
  world: "world/super-supportive",
  aliases: ["object reading"],
  description: "A skill that reads an object's recent history by touch.",
} as const satisfies WorldSkill
