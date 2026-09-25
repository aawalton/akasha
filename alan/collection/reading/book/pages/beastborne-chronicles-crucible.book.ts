import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const beastborneChroniclesCrucible = {
  id: "019db533-f390-7905-9d43-aa60b62e0ee9",
  type: "page-type/book",
  slug: "beastborne-chronicles-crucible",
  title: "Beastborne Chronicles: Crucible",
  status: "completed",
  unit: "unit/words",
  position: 4,
  ownLength: 215500,
  ownProgress: 215500,
  publishedAt: "2023-01-05",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BQG3ZZ25",
      externalLink: "https://amazon.com/dp/B0BQG3ZZ25",
    },
  ],
} as const satisfies Book
