import type { WorldClass } from "../world-class.page-type.ts"

export const hedonisticWastrel = {
  id: "01a0657e-01f6-7478-88a8-26db9a43db6b",
  pageTypeSlug: "world-class",
  slug: "hedonistic-wastrel",
  title: "Hedonistic Wastrel",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["genius-of-sloth"],
} as const satisfies WorldClass
