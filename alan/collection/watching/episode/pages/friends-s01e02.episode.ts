import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS01e02 = {
  id: "01a18848-c2b8-79e6-9bf0-cfe8e8aa53a8",
  type: "page-type/episode",
  slug: "friends-s01e02",
  description:
    "Ross's lesbian ex-wife Carol is pregnant with his child, and he doesn't like her choice of last name for the baby. Rachel finds out that her ex-fiancé went on what would have been their honeymoon with her maid of honor.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-1"],
  position: 2,
  publishedAt: "1994-09-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86012",
      externalLink: "https://www.themoviedb.org/tv/1668/season/1/episode/2",
    },
  ],
  title: "The One with the Sonogram at the End",
  episodeType: "standard",
  stillPath: "/1tkibWEdFUGVu74odpuiednNgMX.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
