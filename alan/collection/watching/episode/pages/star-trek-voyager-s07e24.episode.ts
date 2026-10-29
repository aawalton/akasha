import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS07e24 = {
  id: "01a18853-ac93-7be8-9f20-b9093da0777d",
  type: "page-type/episode",
  slug: "star-trek-voyager-s07e24",
  description:
    "Stardate: 54890.7 - The Doctor is forced to carry out a secret mission where he must impersonate members of the Voyager crew.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-7"],
  position: 24,
  publishedAt: "2001-05-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4466913",
      externalLink: "https://www.themoviedb.org/tv/1855/season/7/episode/24",
    },
  ],
  title: "Renaissance Man",
  episodeType: "standard",
  stillPath: "/r9lVms8EcFbCCQS2YJYoY9d9vdJ.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
