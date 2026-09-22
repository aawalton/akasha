import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const doorgnoll = {
  id: "01a0657e-01d1-7b79-870a-d513a3411250",
  type: "page-type/world-class",
  slug: "doorgnoll",
  title: "Doorgnoll",
  world: "world/the-wandering-inn",
  appearanceCount: 20,
  evolvesToSlugs: [
    "world-class/kingbane-lineholder",
    "world-class/portal-guardian",
    "world-class/scion-of-discontinuance",
  ],
  references: "jsonl",
} as const satisfies WorldClass
