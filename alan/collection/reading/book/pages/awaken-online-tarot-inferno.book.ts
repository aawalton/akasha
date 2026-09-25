import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const awakenOnlineTarotInferno = {
  id: "019db533-f390-78b6-94b6-c197e4def0f0",
  type: "page-type/book",
  slug: "awaken-online-tarot-inferno",
  title: "Awaken Online: Tarot: Inferno",
  status: "completed",
  unit: "unit/words",
  position: 3,
  ownLength: 157500,
  ownProgress: 157500,
  publishedAt: "2020-10-03",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08GY8C39Q",
      externalLink: "https://amazon.com/dp/B08GY8C39Q",
    },
  ],
} as const satisfies Book
