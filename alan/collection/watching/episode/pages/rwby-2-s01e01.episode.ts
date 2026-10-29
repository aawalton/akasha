import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const rwby2S01e01 = {
  id: "01a18884-8767-7ef4-a837-f782ed3ec772",
  type: "page-type/episode",
  slug: "rwby-2-s01e01",
  description:
    "A fifteen-year-old girl with exceptional combat skills is hand-picked by a famous headmaster to join his elite school for training Huntsmen and Huntresses.\n\nAnd so the adventure begins.",
  ownLength: 12,
  ownProgress: 12,
  partOfCollections: ["season/rwby-volume-1"],
  position: 1,
  publishedAt: "2013-07-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "918552",
      externalLink: "https://www.themoviedb.org/tv/50137/season/1/episode/1",
    },
  ],
  title: "Ruby Rose",
  episodeType: "standard",
  stillPath: "/fjIHzRGCe3UWV7iyVbnuhOVA2AK.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T16:35:49.223Z",
  updatedAt: "2026-10-29T16:35:49.223Z",
} as const satisfies Episode
