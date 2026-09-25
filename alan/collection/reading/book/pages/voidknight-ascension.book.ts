import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const voidknightAscension = {
  id: "019db533-f38a-749e-b930-ce8ce94f00cd",
  type: "page-type/book",
  slug: "voidknight-ascension",
  title: "Voidknight Ascension",
  status: "completed",
  unit: "unit/words",
  position: 1,
  ownLength: 149000,
  ownProgress: 149000,
  publishedAt: "2023-12-02",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CP3MLX8T",
      externalLink: "https://amazon.com/dp/B0CP3MLX8T",
    },
  ],
} as const satisfies Book
