import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const summonTheWatch = {
  id: "01a0657d-0302-790c-a61a-cbf8596fa3cf",
  type: "page-type/world-skill",
  slug: "summon-the-watch",
  title: "Summon the Watch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
