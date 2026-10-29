import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS05e17 = {
  id: "01a1884b-ef68-7ca0-bfe8-f285a06dfe52",
  type: "page-type/episode",
  slug: "ncis-s05e17",
  description:
    "Palmer is put in grave danger when he becomes the target of an anonymous murderer, whom only he can recognize.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-5"],
  position: 17,
  publishedAt: "2008-05-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334469",
      externalLink: "https://www.themoviedb.org/tv/4614/season/5/episode/17",
    },
  ],
  title: "About Face",
  episodeType: "standard",
  stillPath: "/jfOETc4OCEHjTBkKzImN7yIKdHh.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
