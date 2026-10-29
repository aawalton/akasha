import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theChosenS01e03 = {
  id: "01a18856-9869-74c9-9142-868287c28791",
  type: "page-type/episode",
  slug: "the-chosen-s01e03",
  description:
    "Jesus befriends and teaches the group of children who discover His camp on the outskirts of Capernaum.",
  ownLength: 29,
  ownProgress: 0,
  partOfCollections: ["season/the-chosen-season-1"],
  position: 3,
  publishedAt: "2019-04-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1757407",
      externalLink: "https://www.themoviedb.org/tv/85077/season/1/episode/3",
    },
  ],
  title: "Jesus Loves the Little Children",
  episodeType: "standard",
  stillPath: "/vakhgGj5qIPoBz30DHBAsGpdTrh.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:45:38.921Z",
  updatedAt: "2026-10-29T15:45:38.921Z",
} as const satisfies Episode
