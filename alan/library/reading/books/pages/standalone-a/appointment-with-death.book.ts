import type { Book } from "../../book.page-type.ts"

export const appointmentWithDeath = {
  id: "019db533-f399-7c6a-aff4-4b496896ddec",
  pageTypeSlug: "book",
  slug: "appointment-with-death",
  title: "Appointment with Death",
  kind: "read",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 16,
} as const satisfies Book
