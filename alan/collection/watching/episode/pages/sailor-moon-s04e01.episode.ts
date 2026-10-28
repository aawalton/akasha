import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const sailorMoonS04e01 = {
  id: "01a183d8-4897-71eb-abc8-3640603a209e",
  type: "page-type/episode",
  slug: "sailor-moon-s04e01",
  description:
    "During a solar eclipse, a mysterious floating circus tent appears in the sky over Tokyo. Meanwhile, Chibiusa is fascinated by a Pegasus who appears to her in a dream.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/sailor-moon-season-4"],
  position: 1,
  publishedAt: "1995-03-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "992468",
      externalLink: "https://www.themoviedb.org/tv/3570/season/4/episode/1",
    },
  ],
  title: "Dreams Take Flight",
  episodeType: "standard",
  stillPath: "/kg2WYI5eBhNZ4AI98zttgu9pGr8.jpg",
  voteAverage: 7,
  createdAt: "2026-10-28T18:49:12.078Z",
  updatedAt: "2026-10-28T18:49:12.078Z",
} as const satisfies Episode
