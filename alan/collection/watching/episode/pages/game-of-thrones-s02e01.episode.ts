import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS02e01 = {
  id: "01a18849-08b2-7a45-9641-2a5c87f762a9",
  type: "page-type/episode",
  slug: "game-of-thrones-s02e01",
  description:
    "Tyrion arrives to save Joffrey's crown from threats old and new; Daenerys searches for allies and water in the Red Waste.",
  ownLength: 53,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-2"],
  position: 1,
  publishedAt: "2012-04-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "63066",
      externalLink: "https://www.themoviedb.org/tv/1399/season/2/episode/1",
    },
  ],
  title: "The North Remembers",
  episodeType: "standard",
  stillPath: "/gGHtlTvHpSGZ8DIrxMyK3Ewkc1Y.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
