import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const myTeenRomanticComedySnafu = {
  id: "01a183dc-f229-7e2a-a3bc-290e6f3c2671",
  type: "page-type/show",
  slug: "my-teen-romantic-comedy-snafu",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/my-teen-romantic-comedy-snafu"],
  publishedAt: "2013-04-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "65676", externalLink: "https://www.themoviedb.org/tv/65676" },
  ],
  title: "My Teen Romantic Comedy SNAFU",
  createdAt: "2026-10-28T18:54:17.637Z",
  updatedAt: "2026-10-28T18:54:17.637Z",
} as const satisfies Show
