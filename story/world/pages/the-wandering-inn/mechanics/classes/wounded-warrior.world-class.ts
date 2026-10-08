import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const woundedWarrior = {
  id: "01a06586-0a84-7302-a9e8-3a4b4e62f2a8",
  type: "page-type/world-class",
  slug: "wounded-warrior",
  title: "Wounded Warrior",
  world: "world/the-wandering-inn",
  appearanceCount: 21,
  evolvesToSlugs: ["world-class/silversteel-armsmistress"],
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.468Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
