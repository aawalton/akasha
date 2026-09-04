import type { Book } from "../../book.page-type.ts"

export const saintsNoUnhallowedHand = {
  id: "019db533-f39d-7367-865c-e27f11c22f47",
  pageTypeSlug: "book",
  slug: "saints-no-unhallowed-hand",
  title: "Saints: No Unhallowed Hand",
  status: "not-started",
  author: "The Church of Jesus Christ of Latter-day Saints",
  unitSlug: "words",
  position: 2,
  ownLength: 208250,
} as const satisfies Book
