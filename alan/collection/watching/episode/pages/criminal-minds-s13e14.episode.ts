import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS13e14 = {
  id: "01a18844-d7f7-7dcc-bd76-836021517a8a",
  type: "page-type/episode",
  slug: "criminal-minds-s13e14",
  description:
    "The BAU is called when the New Orleans P.D. discovers a mass grave inside a vandalized above-ground crypt in a local cemetery.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-13"],
  position: 14,
  publishedAt: "2018-01-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1402729",
      externalLink: "https://www.themoviedb.org/tv/4057/season/13/episode/14",
    },
  ],
  title: "Miasma",
  episodeType: "standard",
  stillPath: "/xp2gjOzsVsXgiRAxumbRxcloe07.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
