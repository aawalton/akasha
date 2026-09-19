import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const resistanceCurses = {
  id: "01a0657d-02b1-77ea-8f39-9801597a6891",
  type: "page-type/world-skill",
  slug: "resistance-curses",
  title: "Resistance: Curses",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
