import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const runelordsWizardborn = {
  id: "019db533-f39a-782b-967b-93f103ccbc1b",
  type: "page-type/book",
  slug: "runelords-wizardborn",
  title: "Runelords: Wizardborn",
  status: "not-started",
  author: "David Farland",
  unit: "unit/words",
  position: 2,
  ownLength: 111000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B003J5UIBO",
      externalLink: "https://www.amazon.com/dp/B003J5UIBO",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
