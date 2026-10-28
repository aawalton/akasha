import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const sailorMoonS01e02 = {
  id: "01a183d8-488f-7f89-9a14-dc624f7bb98a",
  type: "page-type/episode",
  slug: "sailor-moon-s01e02",
  description:
    "The boys at Usagi's school are misbehaving, and it may have something to do with the mysterious new fortune teller in town.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/sailor-moon-season-1"],
  position: 2,
  publishedAt: "1992-03-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "992278",
      externalLink: "https://www.themoviedb.org/tv/3570/season/1/episode/2",
    },
  ],
  title: "Punishment Awaits: The House of Fortune Is the Monster Mansion",
  episodeType: "standard",
  stillPath: "/sYxH4L8WUFUBXcTRmuXtGJ2ddAM.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-28T18:49:12.078Z",
  updatedAt: "2026-10-28T18:49:12.078Z",
} as const satisfies Episode
