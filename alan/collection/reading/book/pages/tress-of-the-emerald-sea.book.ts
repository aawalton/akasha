import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const tressOfTheEmeraldSea = {
  id: "019db533-f39d-73dc-a901-480ec54aa67f",
  type: "page-type/book",
  slug: "tress-of-the-emerald-sea",
  title: "Tress of the Emerald Sea",
  status: "not-started",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 7,
  ownLength: 118750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BPNB19CL",
      externalLink: "https://www.amazon.com/dp/B0BPNB19CL",
    },
  ],
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
