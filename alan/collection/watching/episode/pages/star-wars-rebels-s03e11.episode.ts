import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS03e11 = {
  id: "01a18853-ddfe-79bb-b6bb-5d254da0fe11",
  type: "page-type/episode",
  slug: "star-wars-rebels-s03e11",
  description:
    "The crew returns to Geonosis in search of a missing rebel team sent to investigate suspicious activity there, and are surprised by what they find.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-3"],
  position: 11,
  publishedAt: "2017-01-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1248327",
      externalLink: "https://www.themoviedb.org/tv/60554/season/3/episode/11",
    },
  ],
  title: "Ghosts of Geonosis (1)",
  episodeType: "standard",
  stillPath: "/hh36iv3Xsj3IptwDQhPyfLZ4wrT.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
