import type { Book } from "../../book.page-type.ts"

export const theFabricOfReality2 = {
  id: "019db533-f39e-7243-b7eb-952ecaa60650",
  pageTypeSlug: "book",
  slug: "the-fabric-of-reality-2",
  title: "The Fabric of Reality",
  kind: "read",
  status: "completed",
  rank: "S",
  author: "David Deutsch",
  unitSlug: "words",
  ownLength: 216450,
  ownProgress: 216450,
} as const satisfies Book
