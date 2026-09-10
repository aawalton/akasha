import type { Book } from "../book.page-type.types.ts"

export const administrativeRecords = {
  id: "019db533-f39d-7c5e-b352-8559beed64ba",
  pageTypeSlug: "book",
  type: "book",
  slug: "administrative-records",
  title: "Administrative Records",
  status: "not-started",
  author: "Asaph Young Chun, Michael D. Larsen",
  unit: "words",
  position: 5,
} as const satisfies Book
