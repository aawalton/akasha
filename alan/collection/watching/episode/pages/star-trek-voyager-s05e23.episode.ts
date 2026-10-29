import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS05e23 = {
  id: "01a18853-ac90-7556-8abc-05c301e78da1",
  type: "page-type/episode",
  slug: "star-trek-voyager-s05e23",
  description:
    "Stardate: Unknown. The crew of a time ship from the future recruits Seven to attempt preventing Voyager's forthcoming destruction.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-5"],
  position: 23,
  publishedAt: "1999-05-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113276",
      externalLink: "https://www.themoviedb.org/tv/1855/season/5/episode/23",
    },
  ],
  title: "Relativity",
  episodeType: "standard",
  stillPath: "/2RpmvjT4sTfFKYFGbCJKDvyy5UX.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
