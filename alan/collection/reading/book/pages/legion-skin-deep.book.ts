import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const legionSkinDeep = {
  id: "019db533-f38a-7c1b-8f24-2ead76493597",
  type: "page-type/book",
  slug: "legion-skin-deep",
  title: "Legion: Skin Deep",
  status: "not-started",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 2,
  ownLength: 38750,
  publishedAt: "2014-11-24",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00PYBILPG",
      externalLink: "https://amazon.com/dp/B00PYBILPG",
    },
  ],
} as const satisfies Book
