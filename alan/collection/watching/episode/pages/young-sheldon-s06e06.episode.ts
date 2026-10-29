import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSheldonS06e06 = {
  id: "01a1885a-252f-7268-b3fc-d7207ae1a34b",
  type: "page-type/episode",
  slug: "young-sheldon-s06e06",
  description:
    "George Sr. is asked to help with the football team. Also, Mandy discovers Georgie and Connie's secret business.",
  ownLength: 20,
  ownProgress: 0,
  partOfCollections: ["season/young-sheldon-season-6"],
  position: 6,
  publishedAt: "2022-11-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4017983",
      externalLink: "https://www.themoviedb.org/tv/71728/season/6/episode/6",
    },
  ],
  title: "An Ugly Car, an Affair and Some Kickass Football",
  episodeType: "standard",
  stillPath: "/mzUQnRmSTwpRXwS4ir8K8SwF0me.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:49:31.561Z",
  updatedAt: "2026-10-29T15:49:31.561Z",
} as const satisfies Episode
