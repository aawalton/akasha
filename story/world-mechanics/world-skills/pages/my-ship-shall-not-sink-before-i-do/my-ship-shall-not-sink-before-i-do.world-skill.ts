import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const myShipShallNotSinkBeforeIDo = {
  id: "01a0657d-0270-7de7-a4d8-7742dbdf64c9",
  type: "world-skill",
  slug: "my-ship-shall-not-sink-before-i-do",
  title: "My Ship Shall Not Sink Before I Do",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
