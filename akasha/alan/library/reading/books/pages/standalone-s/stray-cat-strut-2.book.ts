import type { Book } from "../../book.page-type.ts"

export const strayCatStrut2 = {
  id: "019db533-f391-76f7-865a-8c4a2c0808b6",
  pageTypeSlug: "book",
  slug: "stray-cat-strut-2",
  title: "Stray Cat Strut 2",
  kind: "read",
  status: "not-started",
  author: "RavensDagger",
  unitSlug: "words",
  position: 2,
  ownLength: 89750,
  publishedAt: "2022-10-18",
  source: "kindle",
  externalId: "B0BF2S742R",
  externalLink: "https://amazon.com/dp/B0BF2S742R",
} as const satisfies Book
