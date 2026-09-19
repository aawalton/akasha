import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const squadFirstToGreetDeath = {
  id: "01a0657d-02ee-7a15-ae93-088a90301e08",
  type: "page-type/world-skill",
  slug: "squad-first-to-greet-death",
  title: "Squad: First to Greet Death",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
