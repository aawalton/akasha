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
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
