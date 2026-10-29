import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S02e02 = {
  id: "01a1887f-e188-7628-a6a0-8f9f72f756b7",
  type: "page-type/episode",
  slug: "star-trek-2-s02e02",
  description:
    "The crew of the Enterprise are held captive by an alien who turns out to be the Greek god Apollo.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-2"],
  position: 2,
  publishedAt: "1967-09-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13996",
      externalLink: "https://www.themoviedb.org/tv/253/season/2/episode/2",
    },
  ],
  title: "Who Mourns for Adonais?",
  episodeType: "standard",
  stillPath: "/qd2s0VYJfMweA9ijeydhvQb3kLY.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
