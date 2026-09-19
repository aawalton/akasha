import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const reassuringPresence = {
  id: "01a0657d-02a5-746a-91d1-eed95400ee0c",
  type: "page-type/world-skill",
  slug: "reassuring-presence",
  title: "Reassuring Presence",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
