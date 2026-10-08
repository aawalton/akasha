import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const administrativeRecords = {
  id: "019db533-f39d-7c5e-b352-8559beed64ba",
  type: "page-type/book",
  slug: "administrative-records",
  title: "Administrative Records",
  status: "not-started",
  author: "Asaph Young Chun, Michael D. Larsen",
  unit: "unit/words",
  position: 5,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
