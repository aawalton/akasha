import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S01e29 = {
  id: "01a1887f-e187-71a5-ae50-3be0d02ae620",
  type: "page-type/episode",
  slug: "star-trek-2-s01e29",
  description:
    "Kirk and the Enterprise must combat parasitic aliens threatening the lives of millions.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-1"],
  position: 29,
  publishedAt: "1967-04-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13980",
      externalLink: "https://www.themoviedb.org/tv/253/season/1/episode/29",
    },
  ],
  title: "Operation: Annihilate!",
  episodeType: "finale",
  stillPath: "/vsoE661WiC5i7KpC8YAPUMkabwP.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
