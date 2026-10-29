import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS02e01 = {
  id: "01a18857-c366-7cdb-940c-6b5bea513bbe",
  type: "page-type/episode",
  slug: "the-office-s02e01",
  description:
    "It's time for the \"Dundies\", Dunder Mifflin's annual awards banquet (held at the neighborhood Chili's), and the staff must endure the excruciating performance of their inept emcee, boss Michael Scott.",
  ownLength: 21,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-2"],
  position: 1,
  publishedAt: "2005-09-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170148",
      externalLink: "https://www.themoviedb.org/tv/2316/season/2/episode/1",
    },
  ],
  title: "The Dundies",
  episodeType: "standard",
  stillPath: "/vwwXX5AhEKq3Yr51D6191fcakit.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
