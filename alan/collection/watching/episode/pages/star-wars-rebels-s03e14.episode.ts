import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS03e14 = {
  id: "01a18853-ddfe-7637-b436-ba614f4ac7a4",
  type: "page-type/episode",
  slug: "star-wars-rebels-s03e14",
  description:
    "To help recruit her people to join the rebels, Sabine reluctantly agrees to learn to wield an ancient Mandalorian weapon but finds the challenge more difficult than expected.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-3"],
  position: 14,
  publishedAt: "2017-01-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1256394",
      externalLink: "https://www.themoviedb.org/tv/60554/season/3/episode/14",
    },
  ],
  title: "Trials of the Darksaber",
  episodeType: "standard",
  stillPath: "/qmohTJamaSHgS1SH0hFrq0VIpEl.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
