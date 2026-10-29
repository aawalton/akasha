import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS15e13 = {
  id: "01a1884b-ef76-7469-b51a-3299a32f701b",
  type: "page-type/episode",
  slug: "ncis-s15e13",
  description:
    "After McGee and Torres visit the home of a high schooler who witnessed a hit-and-run, her parents flee with their daughter, leaving NCIS in the lurch.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-15"],
  position: 13,
  publishedAt: "2018-01-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1416884",
      externalLink: "https://www.themoviedb.org/tv/4614/season/15/episode/13",
    },
  ],
  title: "Family Ties",
  episodeType: "standard",
  stillPath: "/3z9cOOuJvxVEs1E9eu4rT2wHEsV.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
