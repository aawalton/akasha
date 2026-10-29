import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS02e11 = {
  id: "01a18853-ac8a-7f14-a6e4-1dbca34b6b39",
  type: "page-type/episode",
  slug: "star-trek-voyager-s02e11",
  description:
    "Stardate: Unknown. After the Kazon steal some Federation technology Chakotay goes after them on his own and is captured.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-2"],
  position: 11,
  publishedAt: "1995-11-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1005909",
      externalLink: "https://www.themoviedb.org/tv/1855/season/2/episode/11",
    },
  ],
  title: "Maneuvers",
  episodeType: "standard",
  stillPath: "/kHGfZiOywMC5UiQqFzbOOPp5sZ2.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
