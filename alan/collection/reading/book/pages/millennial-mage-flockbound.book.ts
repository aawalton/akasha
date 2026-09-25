import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const millennialMageFlockbound = {
  id: "019db533-f388-7f1d-a57c-a5406f313d99",
  type: "page-type/book",
  slug: "millennial-mage-flockbound",
  title: "Millennial Mage: Flockbound",
  status: "completed",
  unit: "unit/words",
  position: 11,
  ownLength: 203750,
  ownProgress: 203750,
  publishedAt: "2025-12-10",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0FMJZZ16X",
      externalLink: "https://amazon.com/dp/B0FMJZZ16X",
    },
  ],
} as const satisfies Book
