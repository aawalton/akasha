import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theFrugalWizardsHandbookForSurvivingMedievalEngland = {
  id: "019db533-f39d-727a-8930-c085885d6434",
  type: "page-type/book",
  slug: "the-frugal-wizards-handbook-for-surviving-medieval-england",
  title: "The Frugal Wizard's Handbook for Surviving Medieval England",
  status: "not-started",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 11,
  ownLength: 99750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BPN6KC4T",
      externalLink: "https://www.amazon.com/dp/B0BPN6KC4T",
    },
  ],
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
