import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const shatteredLegacyCrystalAwakening = {
  id: "019db533-f38a-73d4-ba10-5be193dd3af7",
  type: "page-type/book",
  slug: "shattered-legacy-crystal-awakening",
  title: "Shattered Legacy: Crystal Awakening",
  status: "not-started",
  unit: "unit/words",
  position: 1,
  ownLength: 105750,
  publishedAt: "2022-11-29",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BC9WGKX6",
      externalLink: "https://amazon.com/dp/B0BC9WGKX6",
    },
  ],
} as const satisfies Book
