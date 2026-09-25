import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const weaponsAndWieldersSixSacredSwords = {
  id: "019db533-f38a-73bd-a2f6-e5b5562d6c4f",
  type: "page-type/book",
  slug: "weapons-and-wielders-six-sacred-swords",
  title: "Weapons and Wielders: Six Sacred Swords",
  status: "completed",
  unit: "unit/words",
  position: 1,
  ownLength: 102000,
  ownProgress: 102000,
  publishedAt: "2019-02-08",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07NKBSZGF",
      externalLink: "https://amazon.com/dp/B07NKBSZGF",
    },
  ],
} as const satisfies Book
