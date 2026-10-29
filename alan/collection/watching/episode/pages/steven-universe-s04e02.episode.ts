import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS04e02 = {
  id: "01a18855-67ea-7d9e-96a9-0171ff9d1f65",
  type: "page-type/episode",
  slug: "steven-universe-s04e02",
  description: "Steven and the Gems examine fusions.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-4"],
  position: 2,
  publishedAt: "2016-08-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1214017",
      externalLink: "https://www.themoviedb.org/tv/61175/season/4/episode/2",
    },
  ],
  title: "Know Your Fusion",
  episodeType: "standard",
  stillPath: "/rcPIf42Pwkg8D6FQ7YzBJsGggWK.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
