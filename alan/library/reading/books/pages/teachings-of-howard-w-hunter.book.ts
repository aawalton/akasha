import type { Book } from "../book.page-type.ts"

export const teachingsOfHowardWHunter = {
  id: "019db533-f39d-7a89-97d5-d8e9472890ad",
  pageTypeSlug: "book",
  type: "book",
  slug: "teachings-of-howard-w-hunter",
  title: "Teachings of Howard W. Hunter",
  status: "not-started",
  author: "Howard W. Hunter",
  unit: "words",
  position: 15,
  ownLength: 67750,
} as const satisfies Book
