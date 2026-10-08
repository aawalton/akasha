import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const magicPaintShaman = {
  id: "01a0657e-139b-7372-9bf5-4b743df1099c",
  type: "page-type/world-class",
  slug: "magic-paint-shaman",
  title: "Magic Paint Shaman",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["world-class/shaman-of-the-old-ways"],
  createdAt: "2026-09-03T04:19:16.507Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
