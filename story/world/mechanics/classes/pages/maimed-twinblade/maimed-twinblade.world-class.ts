import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const maimedTwinblade = {
  id: "01a0657e-139c-7f6c-9db1-8a3308d769cf",
  type: "page-type/world-class",
  slug: "maimed-twinblade",
  title: "Maimed Twinblade",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["twinblade-linebreaker"],
  references: "jsonl",
} as const satisfies WorldClass
