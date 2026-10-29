import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS02e22 = {
  id: "01a18853-ac8b-7915-9928-e6895e048a11",
  type: "page-type/episode",
  slug: "star-trek-voyager-s02e22",
  description:
    "Stardate: Unknown. When Tuvok crashes on a moon, he discovers three small children who believe they are about to die.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-2"],
  position: 22,
  publishedAt: "1996-04-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113061",
      externalLink: "https://www.themoviedb.org/tv/1855/season/2/episode/22",
    },
  ],
  title: "Innocence",
  episodeType: "standard",
  stillPath: "/e19ysGeJMTn0OFohPJKHDpXg1AN.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
