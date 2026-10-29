import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS02e01 = {
  id: "01a18853-ddfc-7073-9c8a-e7bc584a57d0",
  type: "page-type/episode",
  slug: "star-wars-rebels-s02e01",
  description:
    "Ahsoka sends the Rebel crew to find and recruit a war hero to their cause, but when they discover it is Captain Rex, trust issues put the mission at risk.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-2"],
  position: 1,
  publishedAt: "2015-10-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1117686",
      externalLink: "https://www.themoviedb.org/tv/60554/season/2/episode/1",
    },
  ],
  title: "The Lost Commanders",
  episodeType: "standard",
  stillPath: "/fCZDEVcOF2pFUzAPaikHK8uvAF7.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
