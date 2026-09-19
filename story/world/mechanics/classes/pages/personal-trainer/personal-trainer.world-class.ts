import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const personalTrainer = {
  id: "01a0657e-0237-74c4-ac2f-55bfd0fc6f2a",
  type: "page-type/world-class",
  slug: "personal-trainer",
  title: "Personal Trainer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
