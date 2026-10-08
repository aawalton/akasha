import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const warrior = {
  id: "01a06586-0a74-7351-a868-3373653c153d",
  type: "page-type/world-class",
  slug: "warrior",
  title: "Warrior",
  world: "world/the-wandering-inn",
  appearanceCount: 336,
  aliases: ["warriors"],
  evolvesToSlugs: [
    "world-class/bannerlady",
    "world-class/berserker",
    "world-class/champion",
    "world-class/general",
    "world-class/weapon-expert",
  ],
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.452Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
