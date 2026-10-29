import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S01e19 = {
  id: "01a1887f-e187-7a67-b874-b99b218f778e",
  type: "page-type/episode",
  slug: "star-trek-2-s01e19",
  description:
    "In a freak accident the Enterprise is sent back to 20th century Earth, and must find their way back without changing history.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-1"],
  position: 19,
  publishedAt: "1967-01-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13970",
      externalLink: "https://www.themoviedb.org/tv/253/season/1/episode/19",
    },
  ],
  title: "Tomorrow Is Yesterday",
  episodeType: "standard",
  stillPath: "/ef2XTZEWZ3O2zNMIa3Q26JZSsXs.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
