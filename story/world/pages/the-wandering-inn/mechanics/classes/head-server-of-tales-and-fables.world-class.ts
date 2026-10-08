import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const headServerOfTalesAndFables = {
  id: "01a0657e-1371-709c-932c-e478c69bc2e8",
  type: "page-type/world-class",
  slug: "head-server-of-tales-and-fables",
  title: "Head Server of Tales and Fables",
  world: "world/the-wandering-inn",
  appearanceCount: 10,
  evolvesToSlugs: ["world-class/wandering-server-of-stories"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.465Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
