import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theViridianGateArchivesDarklingSiege = {
  id: "019db533-f38b-70af-ba71-b6af6e31356c",
  type: "page-type/book",
  slug: "the-viridian-gate-archives-darkling-siege",
  title: "The Viridian Gate Archives: Darkling Siege",
  status: "completed",
  unit: "unit/words",
  position: 7,
  ownLength: 131250,
  ownProgress: 131250,
  publishedAt: "2020-01-28",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B082WLZWLZ",
      externalLink: "https://amazon.com/dp/B082WLZWLZ",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
