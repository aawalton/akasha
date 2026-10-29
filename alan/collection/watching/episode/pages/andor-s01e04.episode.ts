import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const andorS01e04 = {
  id: "01a18843-186f-7135-ad23-7e80287bdfd6",
  type: "page-type/episode",
  slug: "andor-s01e04",
  description:
    "Out of options, Cassian is recruited for a dangerous mission to infiltrate an Imperial garrison.",
  ownLength: 50,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-andor-season-1"],
  position: 4,
  publishedAt: "2022-09-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3745383",
      externalLink: "https://www.themoviedb.org/tv/83867/season/1/episode/4",
    },
  ],
  title: "Aldhani",
  episodeType: "standard",
  stillPath: "/7YzyYsFURJXfUTNdxUJuhg4IKQh.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:24:20.975Z",
  updatedAt: "2026-10-29T15:24:20.975Z",
} as const satisfies Episode
