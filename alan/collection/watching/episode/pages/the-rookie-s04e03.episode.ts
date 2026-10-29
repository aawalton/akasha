import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theRookieS04e03 = {
  id: "01a18885-4805-7a71-8dbd-65b13f56cb0b",
  type: "page-type/episode",
  slug: "the-rookie-s04e03",
  description:
    "Officer Nolan and officer Chen report to a structure fire and suspect that there is more to the situation than meets the eye. Meanwhile, after witnessing a sniper shooting, the team searches for the shooter and discovers that the perpetrator has a connection to one of their own.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/the-rookie-season-4"],
  position: 3,
  publishedAt: "2021-10-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3232370",
      externalLink: "https://www.themoviedb.org/tv/79744/season/4/episode/3",
    },
  ],
  title: "In the Line of Fire",
  episodeType: "standard",
  stillPath: "/oipsV2gctB39cbLJ3GaEe7CQnjy.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T16:36:38.529Z",
  updatedAt: "2026-10-29T16:36:38.529Z",
} as const satisfies Episode
