import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const doorgnoll = {
  id: "01a0657e-01d1-7b79-870a-d513a3411250",
  type: "page-type/world-class",
  slug: "doorgnoll",
  title: "Doorgnoll",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["kingbane-lineholder", "portal-guardian", "scion-of-discontinuance"],
  references: "jsonl",
} as const satisfies WorldClass
