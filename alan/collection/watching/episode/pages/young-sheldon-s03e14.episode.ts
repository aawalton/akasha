import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSheldonS03e14 = {
  id: "01a1885a-252c-7e1e-a7bf-7323ebc76ba7",
  type: "page-type/episode",
  slug: "young-sheldon-s03e14",
  description:
    "Sheldon and Georgie mine for platinum in roadside gravel. Mary is concerned when Missy misuses religion to help with a batting slump.",
  ownLength: 18,
  ownProgress: 0,
  partOfCollections: ["season/young-sheldon-season-3"],
  position: 14,
  publishedAt: "2020-02-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2072445",
      externalLink: "https://www.themoviedb.org/tv/71728/season/3/episode/14",
    },
  ],
  title: "A Slump, a Cross and Roadside Gravel",
  episodeType: "standard",
  stillPath: "/ffmY6JWnSmgneuAnrawCy0fKSSR.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:49:31.561Z",
  updatedAt: "2026-10-29T15:49:31.561Z",
} as const satisfies Episode
