import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS03e05 = {
  id: "01a18853-ddfe-76ef-8596-ab943837191a",
  type: "page-type/episode",
  slug: "star-wars-rebels-s03e05",
  description:
    "On a salvage mission led by Captain Rex, the Ghost crew is captured by a unit of old battle droids determined to fight one last battle to end the Clone Wars.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-3"],
  position: 5,
  publishedAt: "2016-10-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1233356",
      externalLink: "https://www.themoviedb.org/tv/60554/season/3/episode/5",
    },
  ],
  title: "The Last Battle",
  episodeType: "standard",
  stillPath: "/gueyvMhtKYlbDQUmMzRgASmLIUi.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
