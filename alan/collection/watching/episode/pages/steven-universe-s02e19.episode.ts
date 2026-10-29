import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS02e19 = {
  id: "01a18855-67e8-7ecc-8d9e-bf281cd8fb98",
  type: "page-type/episode",
  slug: "steven-universe-s02e19",
  description:
    "Steven and Connie must sneak into a hospital to retrieve Rose Quartz's sword from Connie's mother.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-2"],
  position: 19,
  publishedAt: "2015-09-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1097582",
      externalLink: "https://www.themoviedb.org/tv/61175/season/2/episode/19",
    },
  ],
  title: "Nightmare Hospital",
  episodeType: "standard",
  stillPath: "/tgNTmLWUU7898wiY9MFkmz2JFUi.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
