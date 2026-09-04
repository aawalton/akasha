import type { Book } from "../../book.page-type.ts"

export const murderOnTheOrientExpress = {
  id: "019db533-f399-7cea-a8cc-2fd8f40011a2",
  pageTypeSlug: "book",
  slug: "murder-on-the-orient-express",
  title: "Murder on the Orient Express",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 9,
  ownLength: 64000,
} as const satisfies Book
