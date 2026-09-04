import type { WorldClass } from "../world-class.page-type.ts"

export const magicPaintShaman = {
  id: "01a0657e-139b-7372-9bf5-4b743df1099c",
  pageTypeSlug: "world-class",
  slug: "magic-paint-shaman",
  title: "Magic Paint Shaman",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["shaman-of-the-old-ways"],
} as const satisfies WorldClass
