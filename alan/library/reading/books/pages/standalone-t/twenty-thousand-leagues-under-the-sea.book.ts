import type { Book } from "../../book.page-type.ts"

export const twentyThousandLeaguesUnderTheSea = {
  id: "019db533-f39d-75f6-becd-c9ba8718c6bd",
  pageTypeSlug: "book",
  slug: "twenty-thousand-leagues-under-the-sea",
  title: "Twenty Thousand Leagues Under the Sea",
  kind: "read",
  status: "not-started",
  author: "ColorLab ColorLab Series (bogus 'author'), Jules Verne",
  unitSlug: "words",
  position: 1,
  ownLength: 81250,
} as const satisfies Book
