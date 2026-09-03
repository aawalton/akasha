import type { Book } from "../../book.page-type.ts"

export const dragonHeartDwarfCity = {
  id: "019db533-f390-7e05-bf3d-c5549aaca910",
  pageTypeSlug: "book",
  slug: "dragon-heart-dwarf-city",
  title: "Dragon Heart: Dwarf City",
  kind: "read",
  status: "completed",
  unitSlug: "words",
  position: 14,
  ownLength: 102250,
  ownProgress: 102250,
  publishedAt: "2022-03-05",
  partOfSlugs: ["book-series/dragon-heart"],
  source: "kindle",
  externalId: "B09MQZYN75",
  externalLink: "https://amazon.com/dp/B09MQZYN75",
} as const satisfies Book
