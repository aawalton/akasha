import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const remoteCountdown = {
  id: "01a0657d-02b0-7bc3-b272-4401080c0e57",
  type: "page-type/world-skill",
  slug: "remote-countdown",
  title: "Remote Countdown",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
