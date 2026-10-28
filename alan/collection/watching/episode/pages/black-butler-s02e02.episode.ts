import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackButlerS02e02 = {
  id: "01a183d8-99a6-7c45-a06d-21b5d2cbb442",
  type: "page-type/episode",
  slug: "black-butler-s02e02",
  description:
    "Lady Elizabeth desperately seeks the legendary white stag, a mysterious creature believed to granted eternal happiness. Eager to assist the lady in her quest, our heroes take to the river for an adventure that knows no depths.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/black-butler-season-2"],
  position: 2,
  publishedAt: "2010-07-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "919042",
      externalLink: "https://www.themoviedb.org/tv/50712/season/2/episode/2",
    },
  ],
  title: "Solo Butler",
  episodeType: "standard",
  stillPath: "/5iRLygaZFtU2XmV9HtpWjNDdrNB.jpg",
  voteAverage: 7,
  createdAt: "2026-10-28T18:49:32.837Z",
  updatedAt: "2026-10-28T18:49:32.837Z",
} as const satisfies Episode
