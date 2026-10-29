import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS02e14 = {
  id: "01a18853-ac8b-7fb3-a766-8535ac8ab927",
  type: "page-type/episode",
  slug: "star-trek-voyager-s02e14",
  description:
    "Stardate: Unknown. Janeway tries to make an alliance with a Kazon sect for their own protection and so they can continue their journey through the Delta Quadrant.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-2"],
  position: 14,
  publishedAt: "1996-01-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1005910",
      externalLink: "https://www.themoviedb.org/tv/1855/season/2/episode/14",
    },
  ],
  title: "Alliances",
  episodeType: "standard",
  stillPath: "/3ryqpvTrxLXg8ePCpkrj7rlcfbz.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
