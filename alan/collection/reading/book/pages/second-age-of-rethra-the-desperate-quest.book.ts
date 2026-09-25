import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const secondAgeOfRethraTheDesperateQuest = {
  id: "019db533-f38a-7d77-a1e5-f0f681870727",
  type: "page-type/book",
  slug: "second-age-of-rethra-the-desperate-quest",
  title: "Second Age of Rethra: The Desperate Quest",
  status: "completed",
  grade: "A",
  unit: "unit/words",
  position: 2,
  ownLength: 79500,
  ownProgress: 79500,
  publishedAt: "2017-09-14",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B075HNYDFV",
      externalLink: "https://amazon.com/dp/B075HNYDFV",
    },
  ],
} as const satisfies Book
