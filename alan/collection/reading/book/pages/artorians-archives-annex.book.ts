import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const artoriansArchivesAnnex = {
  id: "019db533-f390-7830-b3f0-506b95505573",
  type: "page-type/book",
  slug: "artorians-archives-annex",
  title: "Artorian's Archives: Annex",
  status: "completed",
  unit: "unit/words",
  position: 3,
  ownLength: 98750,
  ownProgress: 98750,
  publishedAt: "2020-02-14",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B083F75GFS",
      externalLink: "https://amazon.com/dp/B083F75GFS",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
