import type { AlanBook } from "../alan-book.page-type.ts"

export const myStrategy = {
  id: "01a0659d-311d-7004-a337-b765b930236a",
  pageTypeSlug: "alan-book",
  slug: "my-strategy",
  title: "My Strategy",
  description:
    "This book is where I work out what to improve next and why. It is not a product roadmap. As I put it in the first session: *\"This isn't about what I'm trying to build. This is about improving my life.\"* The scope is my entire life, organised by my six values — faith, health, wealth, learn, love, fun — plus the work of getting better at improving anything at all. The line that names it: *how Alan improves his life with what he has to spend*.",
  unitSlug: "words",
} as const satisfies AlanBook
