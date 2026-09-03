import type { Book } from "../../book.page-type.ts"

export const disgardiumHolyWar = {
  id: "019db533-f390-7da0-97db-22d842a5c2bd",
  pageTypeSlug: "book",
  slug: "disgardium-holy-war",
  title: "Disgardium: Holy War",
  kind: "read",
  status: "completed",
  unitSlug: "words",
  position: 5,
  ownLength: 131750,
  ownProgress: 131750,
  publishedAt: "2020-09-04",
  partOfSlugs: ["book-series/disgardium"],
  source: "kindle",
  externalId: "B08BJ8Q283",
  externalLink: "https://amazon.com/dp/B08BJ8Q283",
} as const satisfies Book
