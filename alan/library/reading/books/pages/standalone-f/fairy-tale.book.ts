import type { Book } from "../../book.page-type.ts"

export const fairyTale = {
  id: "019f1ab5-92ac-775a-8ee3-bd4d69ead98d",
  pageTypeSlug: "book",
  slug: "fairy-tale",
  title: "Fairy Tale",
  kind: "read",
  status: "completed",
  author: "Stephen King",
  unitSlug: "words",
  source: "open-library",
  externalId: "OL27589863W",
  externalLink: "https://openlibrary.org/works/OL27589863W",
  isbn: "3453273990",
  isbn13: "9781668002186",
  publisher: "Knopf Doubleday Publishing Group",
  originalPublicationYear: 2022,
  rating: 8,
  pageCount: 762,
} as const satisfies Book
