import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS03e19 = {
  id: "01a18848-c2bc-7714-952c-60e63e2ac8f9",
  type: "page-type/episode",
  slug: "friends-s03e19",
  description:
    "Rachel goes on her first date after splitting from Ross... and it's with Mark, her former colleague. Joey is cast in a play and develops a crush on his costar. Monica continues to date Pete, even though she is still not attracted to him.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-3"],
  position: 19,
  publishedAt: "1997-03-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86360",
      externalLink: "https://www.themoviedb.org/tv/1668/season/3/episode/19",
    },
  ],
  title: "The One with the Tiny T-Shirt",
  episodeType: "standard",
  stillPath: "/sxEjTxnAGl0kTaBJdH0WAF8DmpD.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
