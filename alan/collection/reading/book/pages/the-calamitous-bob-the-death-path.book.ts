import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theCalamitousBobTheDeathPath = {
  id: "019db533-f391-780b-b918-bb11311b3337",
  type: "page-type/book",
  slug: "the-calamitous-bob-the-death-path",
  title: "The Calamitous Bob: The Death Path",
  status: "completed",
  unit: "unit/words",
  position: 3,
  ownLength: 98000,
  ownProgress: 98000,
  publishedAt: "2022-10-24",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BKH6XXJS",
      externalLink: "https://amazon.com/dp/B0BKH6XXJS",
    },
  ],
} as const satisfies Book
