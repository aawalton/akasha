import type { Book } from "../../book.page-type.ts"

export const psychologyOfHumanBehavior = {
  id: "019db533-f39d-7fd6-b022-3cb594119883",
  pageTypeSlug: "book",
  slug: "psychology-of-human-behavior",
  title: "Psychology of Human Behavior",
  kind: "read",
  status: "completed",
  author: "Nancy Lui",
  unitSlug: "words",
  ownLength: 277500,
  ownProgress: 277500,
} as const satisfies Book
