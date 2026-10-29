import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS02e10 = {
  id: "01a18852-a9f6-7bb1-a792-53a6f406de01",
  type: "page-type/episode",
  slug: "star-trek-discovery-s02e10",
  description:
    "Burnham is stunned when she learns her ties to Section 31 run deeper than she ever fathomed. Armed with the identity of the Red Angel, the U.S.S. Discovery goes to work on its most critical mission to date.",
  ownLength: 48,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-2"],
  position: 10,
  publishedAt: "2019-03-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1711671",
      externalLink: "https://www.themoviedb.org/tv/67198/season/2/episode/10",
    },
  ],
  title: "The Red Angel",
  episodeType: "standard",
  stillPath: "/v4qsjzl7EMsVKBxa87oImMu0dGz.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
