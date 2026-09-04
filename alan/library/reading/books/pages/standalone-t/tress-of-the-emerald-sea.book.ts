import type { Book } from "../../book.page-type.ts"

export const tressOfTheEmeraldSea = {
  id: "019db533-f39d-73dc-a901-480ec54aa67f",
  pageTypeSlug: "book",
  slug: "tress-of-the-emerald-sea",
  title: "Tress of the Emerald Sea",
  status: "not-started",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 7,
  ownLength: 118750,
  source: "kindle",
  externalId: "B0BPNB19CL",
  externalLink: "https://www.amazon.com/dp/B0BPNB19CL",
} as const satisfies Book
