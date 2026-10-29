import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS20e22 = {
  id: "01a1884b-ef83-708e-a49d-14d84606d650",
  type: "page-type/episode",
  slug: "ncis-s20e22",
  description:
    "Agent Torres finds himself in prison as the team tries to stop an impending terror attack on U.S. soil.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-20"],
  position: 22,
  publishedAt: "2023-05-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4291831",
      externalLink: "https://www.themoviedb.org/tv/4614/season/20/episode/22",
    },
  ],
  title: "Black Sky",
  episodeType: "finale",
  stillPath: "/uEBRVXNZWlYcIgo3to0wXXa1qy0.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
