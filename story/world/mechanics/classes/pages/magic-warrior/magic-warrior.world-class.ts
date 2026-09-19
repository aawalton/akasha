import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const magicWarrior = {
  id: "01a0657e-139b-7978-a196-eb8bfb363367",
  type: "page-type/world-class",
  slug: "magic-warrior",
  title: "Magic Warrior",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
