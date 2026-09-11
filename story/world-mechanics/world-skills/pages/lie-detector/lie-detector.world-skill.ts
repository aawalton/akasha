import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const lieDetector = {
  id: "01a0657d-0239-7123-9a57-8cfd2314c358",
  type: "world-skill",
  slug: "lie-detector",
  title: "Lie Detector",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
