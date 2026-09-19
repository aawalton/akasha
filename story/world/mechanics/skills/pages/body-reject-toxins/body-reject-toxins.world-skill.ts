import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bodyRejectToxins = {
  id: "01a06575-97f7-7836-b5fd-417587cf6d75",
  type: "page-type/world-skill",
  slug: "body-reject-toxins",
  title: "Body: Reject Toxins",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
