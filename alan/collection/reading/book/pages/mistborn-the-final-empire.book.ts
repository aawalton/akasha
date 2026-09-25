import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const mistbornTheFinalEmpire = {
  id: "019db533-f39d-725c-a722-e88dd0bed232",
  type: "page-type/book",
  slug: "mistborn-the-final-empire",
  title: "Mistborn: The Final Empire",
  status: "completed",
  grade: "B",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 1,
  ownLength: 167250,
  ownProgress: 167250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B002GYI9C4",
      externalLink: "https://www.amazon.com/dp/B002GYI9C4",
    },
  ],
} as const satisfies Book
