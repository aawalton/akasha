import type { WorldTitle } from "akasha/story/world/mechanics/titles/world-title.page-type.types.ts"

export const superSupportiveMaster = {
  id: "01a0e9fa-4782-7386-b5d4-26e8458e0ea8",
  type: "page-type/world-title",
  slug: "super-supportive-master",
  title: "Master",
  world: "world/super-supportive",
  aliases: ["marks of mastery"],
  description:
    "An Artonan title for recognised mastery of a field, shown by marks worn on one's garb.",
} as const satisfies WorldTitle
