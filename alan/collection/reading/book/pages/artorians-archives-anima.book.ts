import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const artoriansArchivesAnima = {
  id: "019db533-f390-7817-a84f-1c539fd855ec",
  type: "page-type/book",
  slug: "artorians-archives-anima",
  title: "Artorian's Archives: Anima",
  status: "completed",
  unit: "unit/words",
  position: 6,
  ownLength: 109500,
  ownProgress: 109500,
  publishedAt: "2021-02-06",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08W4JNP2Y",
      externalLink: "https://amazon.com/dp/B08W4JNP2Y",
    },
  ],
} as const satisfies Book
