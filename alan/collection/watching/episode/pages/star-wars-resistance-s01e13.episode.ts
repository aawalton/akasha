import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS01e13 = {
  id: "01a18853-f9af-7434-987f-842c4a7a2507",
  type: "page-type/episode",
  slug: "star-wars-resistance-s01e13",
  description:
    "Synara settles into life on the platform, but her pirate compatriots have other plans for her.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-1"],
  position: 13,
  publishedAt: "2019-01-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1679894",
      externalLink: "https://www.themoviedb.org/tv/79093/season/1/episode/13",
    },
  ],
  title: "The Doza Dilemma",
  episodeType: "standard",
  stillPath: "/vHQ55ZBPVnLQdnbpNiv7b1pTiN8.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
