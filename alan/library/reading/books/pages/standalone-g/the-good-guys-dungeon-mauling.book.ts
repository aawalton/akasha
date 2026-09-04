import type { Book } from "../../book.page-type.ts"

export const theGoodGuysDungeonMauling = {
  id: "019db533-f391-7985-85a1-b1540cbcd8b1",
  pageTypeSlug: "book",
  slug: "the-good-guys-dungeon-mauling",
  title: "The Good Guys: Dungeon Mauling",
  kind: "read",
  status: "completed",
  unitSlug: "words",
  position: 3,
  ownLength: 83500,
  ownProgress: 83500,
  publishedAt: "2018-12-19",
  source: "kindle",
  externalId: "B07JL5YC25",
  externalLink: "https://amazon.com/dp/B07JL5YC25",
} as const satisfies Book
