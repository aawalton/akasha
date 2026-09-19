import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const eliteMercenary = {
  id: "01a0657e-01d6-7cd1-af3c-eb376da99ed4",
  type: "page-type/world-class",
  slug: "elite-mercenary",
  title: "Elite Mercenary",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
