import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theExpanseS04e01 = {
  id: "01a18857-1f7c-7b72-afdb-4e37a8ef1cff",
  type: "page-type/episode",
  slug: "the-expanse-s04e01",
  description:
    "The crew of the Roci investigates a strange protomolecule ruin on an alien planet. Bobbie copes with civilian life on Mars. Drummer and Ashford battle with piracy in the Belt.",
  ownLength: 51,
  ownProgress: 0,
  partOfCollections: ["season/the-expanse-season-4"],
  position: 1,
  publishedAt: "2019-12-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1858313",
      externalLink: "https://www.themoviedb.org/tv/63639/season/4/episode/1",
    },
  ],
  title: "New Terra",
  episodeType: "standard",
  stillPath: "/r0dw6NShkJI1lUKXAV3gDRocnCH.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:46:13.498Z",
  updatedAt: "2026-10-29T15:46:13.498Z",
} as const satisfies Episode
