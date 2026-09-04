import type { Book } from "../../book.page-type.ts"

export const administrativeRecords = {
  id: "019db533-f39d-7c5e-b352-8559beed64ba",
  pageTypeSlug: "book",
  slug: "administrative-records",
  title: "Administrative Records",
  status: "not-started",
  author: "Asaph Young Chun, Michael D. Larsen",
  unitSlug: "words",
  position: 5,
} as const satisfies Book
