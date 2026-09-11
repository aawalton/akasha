import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const removeMess = {
  id: "01a0657d-02b0-7068-a70e-8891efa777ad",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "remove-mess",
  title: "Remove Mess",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
