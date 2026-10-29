import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSheldonS06e01 = {
  id: "01a1885a-252f-75da-8149-63eb2684d016",
  type: "page-type/episode",
  slug: "young-sheldon-s06e01",
  description:
    "George Sr. bails Connie and Georgie out of jail. Also, Sheldon and Missy meet Mandy, and Mary feels unwelcome at church.",
  ownLength: 20,
  ownProgress: 0,
  partOfCollections: ["season/young-sheldon-season-6"],
  position: 1,
  publishedAt: "2022-09-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3800837",
      externalLink: "https://www.themoviedb.org/tv/71728/season/6/episode/1",
    },
  ],
  title: "Four Hundred Cartons of Undeclared Cigarettes and a Niblingo",
  episodeType: "standard",
  stillPath: "/qhWHAa2vIN42Ua8zDRU9x98bkMn.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:49:31.561Z",
  updatedAt: "2026-10-29T15:49:31.561Z",
} as const satisfies Episode
