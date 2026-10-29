import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS03e11 = {
  id: "01a18852-a9f7-7501-850b-d9810cc9f781",
  type: "page-type/episode",
  slug: "star-trek-discovery-s03e11",
  description:
    "Discovery ventures to the Verubin Nebula, where Burnham, Saru, and Culber make a shocking realization about the origin of the Burn. The rest of the crew faces an unexpected threat.",
  ownLength: 55,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-3"],
  position: 11,
  publishedAt: "2020-12-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2387218",
      externalLink: "https://www.themoviedb.org/tv/67198/season/3/episode/11",
    },
  ],
  title: "Su'Kal",
  episodeType: "standard",
  stillPath: "/zxKheCZHAjXV0ZfU9J58aakyzTt.jpg",
  voteAverage: 5.7,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
