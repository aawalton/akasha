import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const rancherBaron = {
  id: "01a06586-0a1d-74dc-adf6-4f75c67e0877",
  type: "page-type/world-class",
  slug: "rancher-baron",
  title: "Rancher Baron",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
