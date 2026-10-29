import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS07e21 = {
  id: "01a18853-ac93-7447-905f-f1f0e903f071",
  type: "page-type/episode",
  slug: "star-trek-voyager-s07e21",
  description:
    "Stardate: 54775.4 - The Voyager crew, on a mission to track down a historic Earth probe designed to contact intelligent life, finds the probe had indeed crossed paths with another civilization, but with catastrophic results.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-7"],
  position: 21,
  publishedAt: "2001-04-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4466864",
      externalLink: "https://www.themoviedb.org/tv/1855/season/7/episode/21",
    },
  ],
  title: "Friendship One",
  episodeType: "standard",
  stillPath: "/lHMKUxnSvEz0467mTmoo3rluC5J.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
