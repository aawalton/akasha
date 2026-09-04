import type { BookRecord } from "../../book-record.page-type.ts"

export const myStrategyOverview = {
  id: "01a0657d-b91d-7800-a4d9-2f8c96c8c093",
  pageTypeSlug: "book-record",
  slug: "my-strategy-overview",
  title: "My Strategy — Orientation",
  definition: "what is settled and what is open in My Strategy",
  bookSlug: "my-strategy",
  brief:
    "Standing orientation for My Strategy — what the book is, what Alan has settled, and what is still open. Read this before an interview session on strategy so nothing already settled gets re-derived and nothing still open gets treated as decided. The numbered pages carry the detail and the quotations; this page carries the map.",
  writing: "md",
} as const satisfies BookRecord
