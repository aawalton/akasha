import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const appointmentWithDeath = {
  id: "019db533-f399-7c6a-aff4-4b496896ddec",
  type: "page-type/book",
  slug: "appointment-with-death",
  title: "Appointment with Death",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 16,
} as const satisfies Book
