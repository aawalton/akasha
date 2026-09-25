import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const scaleAndSeaTrilogySovereignSoul = {
  id: "019db533-f38a-748d-83e4-868ef4b340bd",
  type: "page-type/book",
  slug: "scale-and-sea-trilogy-sovereign-soul",
  title: "Scale & Sea Trilogy: Sovereign Soul",
  status: "completed",
  grade: "C",
  unit: "unit/words",
  position: 1,
  ownLength: 170000,
  ownProgress: 170000,
  publishedAt: "2023-02-28",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BRFNMRTJ",
      externalLink: "https://amazon.com/dp/B0BRFNMRTJ",
    },
  ],
} as const satisfies Book
