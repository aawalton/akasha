import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const personalTrainer = {
  id: "01a0657e-0237-74c4-ac2f-55bfd0fc6f2a",
  type: "world-class",
  slug: "personal-trainer",
  title: "Personal Trainer",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
