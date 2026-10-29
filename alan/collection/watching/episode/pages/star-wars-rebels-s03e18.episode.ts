import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS03e18 = {
  id: "01a18853-ddfe-7836-a4de-d95a54ac5c11",
  type: "page-type/episode",
  slug: "star-wars-rebels-s03e18",
  description:
    "Chopper and AP-5 team up to infiltrate an Imperial station to steal needed codes, but an Imperial specialist turns the droids against the crew to cause chaos.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-3"],
  position: 18,
  publishedAt: "2017-03-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1275775",
      externalLink: "https://www.themoviedb.org/tv/60554/season/3/episode/18",
    },
  ],
  title: "Double Agent Droid",
  episodeType: "standard",
  stillPath: "/kyfLEtpwVxcaW3qZDEAnLSAhpxH.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
