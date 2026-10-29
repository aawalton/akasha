import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS03e21 = {
  id: "01a18853-ac8d-7551-a080-23427e780e48",
  type: "page-type/episode",
  slug: "star-trek-voyager-s03e21",
  description:
    "Stardate: 50973. Kes begins traveling backwards through time from the moment of her death. With each shift, she comes closer to a solution but she also grows months and years younger at a time.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-3"],
  position: 21,
  publishedAt: "1997-04-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113151",
      externalLink: "https://www.themoviedb.org/tv/1855/season/3/episode/21",
    },
  ],
  title: "Before and After",
  episodeType: "standard",
  stillPath: "/rUvqZnfJOc0gUeVuWKmlegFFB5s.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
