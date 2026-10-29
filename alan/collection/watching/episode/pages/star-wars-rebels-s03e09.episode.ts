import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS03e09 = {
  id: "01a18853-ddfe-7e32-ad02-90d77a5095fc",
  type: "page-type/episode",
  slug: "star-wars-rebels-s03e09",
  description:
    "Seeking information on a new Imperial weapon, Ezra and Kanan infiltrate the Imperial factory on Lothal, but must trust an unlikely ally to escape a lockdown.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-3"],
  position: 9,
  publishedAt: "2016-12-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1240560",
      externalLink: "https://www.themoviedb.org/tv/60554/season/3/episode/9",
    },
  ],
  title: "An Inside Man",
  episodeType: "standard",
  stillPath: "/cIy5xKTv0c5KL5vw3xZPVsv0Vmw.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
