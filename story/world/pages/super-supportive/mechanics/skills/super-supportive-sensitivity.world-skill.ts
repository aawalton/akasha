import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveSensitivity = {
  id: "01a0e9f1-d242-7ca1-b873-fdffc51549df",
  type: "page-type/world-skill",
  slug: "super-supportive-sensitivity",
  title: "Sensitivity",
  world: "world/super-supportive",
  aliases: ["psychic defogging package"],
  description:
    "A facet that lets the bearer sense the thing they are trying to divide from the whole.",
} as const satisfies WorldSkill
