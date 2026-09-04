import type { WorldClass } from "../world-class.page-type.ts"

export const crossbowSpeedHunter = {
  id: "01a0657e-1350-7307-b19f-5e4147efe1a7",
  pageTypeSlug: "world-class",
  slug: "crossbow-speed-hunter",
  title: "Crossbow Speed Hunter",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["vampire-hunter"],
} as const satisfies WorldClass
