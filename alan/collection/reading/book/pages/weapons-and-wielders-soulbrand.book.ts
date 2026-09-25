import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const weaponsAndWieldersSoulbrand = {
  id: "019db533-f38a-73a2-b7c9-debf45bb895f",
  type: "page-type/book",
  slug: "weapons-and-wielders-soulbrand",
  title: "Weapons and Wielders: Soulbrand",
  status: "not-started",
  unit: "unit/words",
  position: 3,
  ownLength: 190500,
  publishedAt: "2021-06-11",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B094NVVNP4",
      externalLink: "https://amazon.com/dp/B094NVVNP4",
    },
  ],
} as const satisfies Book
