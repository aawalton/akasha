import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS10e02 = {
  id: "01a1884b-ef6f-747f-95d3-e133cf8b030a",
  type: "page-type/episode",
  slug: "ncis-s10e02",
  description:
    "When the body of a missing NCIS facilities manager is found four months after disappearing on the day of the Navy Yard bombings, the NCIS team is assigned to investigate the strange case for one of their own.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-10"],
  position: 2,
  publishedAt: "2012-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334672",
      externalLink: "https://www.themoviedb.org/tv/4614/season/10/episode/2",
    },
  ],
  title: "Recovery",
  episodeType: "standard",
  stillPath: "/zcbp5hovpNYOgQrumnJ9tKoWZT4.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
