import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const relicboundArcticCryomancer = {
  id: "01a06586-0a20-7131-8f9a-445570effe2c",
  type: "page-type/world-class",
  slug: "relicbound-arctic-cryomancer",
  title: "Relicbound Arctic Cryomancer",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/arctic-cryomancer"],
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.368Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
