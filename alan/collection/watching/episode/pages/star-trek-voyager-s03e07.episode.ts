import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS03e07 = {
  id: "01a18853-ac8c-789e-b654-210b61b75a67",
  type: "page-type/episode",
  slug: "star-trek-voyager-s03e07",
  description:
    "Stardate: 50063.2. Captain Janeway has to undergo a rigorous ritual in order to save Kes' life when she is knocked unconscious.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-3"],
  position: 7,
  publishedAt: "1996-10-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113109",
      externalLink: "https://www.themoviedb.org/tv/1855/season/3/episode/7",
    },
  ],
  title: "Sacred Ground",
  episodeType: "standard",
  stillPath: "/2CxWMkIM9wII8xuGXU2K7rnAgkj.jpg",
  voteAverage: 5.9,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
