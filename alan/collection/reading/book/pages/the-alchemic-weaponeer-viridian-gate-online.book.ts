import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theAlchemicWeaponeerViridianGateOnline = {
  id: "019db533-f38a-72d4-92ec-8953639b2237",
  type: "page-type/book",
  slug: "the-alchemic-weaponeer-viridian-gate-online",
  title: "The Alchemic Weaponeer: Viridian Gate Online",
  status: "completed",
  unit: "unit/words",
  position: 1,
  ownLength: 69250,
  ownProgress: 69250,
  publishedAt: "2019-03-14",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07NY4FJZZ",
      externalLink: "https://amazon.com/dp/B07NY4FJZZ",
    },
  ],
} as const satisfies Book
