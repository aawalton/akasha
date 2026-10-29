import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS13e23 = {
  id: "01a1884b-ef74-7bff-9ba8-bccbb58d531d",
  type: "page-type/episode",
  slug: "ncis-s13e23",
  description:
    "The NCIS team, alongside the FBI and MI6, continue an international manhunt for an escaped British spy who has left one colleague fighting for their life in ICU.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-13"],
  position: 23,
  publishedAt: "2016-05-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1191930",
      externalLink: "https://www.themoviedb.org/tv/4614/season/13/episode/23",
    },
  ],
  title: "Dead Letter",
  episodeType: "standard",
  stillPath: "/3x8eTGNbqqxyWGzs1mnFL0NXJOx.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
