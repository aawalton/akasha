import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theCalamitousBobBlackManaGambit = {
  id: "019db533-f391-7802-8173-866e1764bc98",
  type: "page-type/book",
  slug: "the-calamitous-bob-black-mana-gambit",
  title: "The Calamitous Bob: Black Mana Gambit",
  status: "completed",
  unit: "unit/words",
  position: 6,
  ownLength: 96000,
  ownProgress: 96000,
  publishedAt: "2024-05-22",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0D4ZXWFLF",
      externalLink: "https://amazon.com/dp/B0D4ZXWFLF",
    },
  ],
} as const satisfies Book
