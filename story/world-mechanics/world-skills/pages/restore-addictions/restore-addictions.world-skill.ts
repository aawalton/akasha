import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const restoreAddictions = {
  id: "01a0657d-02b1-7437-b4b2-6624d9a79f2c",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "restore-addictions",
  title: "Restore Addictions",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
