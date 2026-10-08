import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const maimedTwinblade = {
  id: "01a0657e-139c-7f6c-9db1-8a3308d769cf",
  type: "page-type/world-class",
  slug: "maimed-twinblade",
  title: "Maimed Twinblade",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/twinblade-linebreaker"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.508Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
