import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const dockmaster = {
  id: "01a0657e-01d0-771e-a9b5-f994dac1d099",
  type: "world-class",
  slug: "dockmaster",
  title: "Dockmaster",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
