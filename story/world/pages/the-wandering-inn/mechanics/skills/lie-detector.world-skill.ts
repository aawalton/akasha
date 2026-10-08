import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lieDetector = {
  id: "01a0657d-0239-7123-9a57-8cfd2314c358",
  type: "page-type/world-skill",
  slug: "lie-detector",
  title: "Lie Detector",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.521Z",
  updatedAt: "2026-09-22T13:32:35.000Z",
} as const satisfies WorldSkill
