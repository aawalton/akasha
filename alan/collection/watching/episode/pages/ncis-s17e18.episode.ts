import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS17e18 = {
  id: "01a1884b-ef79-72ec-bfe4-2b92f34f5511",
  type: "page-type/episode",
  slug: "ncis-s17e18",
  description:
    "The team searches for answers when the body of a well-regarded Navy technician in the Reserves is found floating in a lake where a popular community event is being held.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-17"],
  position: 18,
  publishedAt: "2020-03-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2183149",
      externalLink: "https://www.themoviedb.org/tv/4614/season/17/episode/18",
    },
  ],
  title: "Schooled",
  episodeType: "standard",
  stillPath: "/mSpsEE6vzUtIiC0itvSVGjmeeJ8.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
