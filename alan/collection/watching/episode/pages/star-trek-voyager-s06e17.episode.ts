import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS06e17 = {
  id: "01a18853-ac91-786e-9e82-50fce4ebc605",
  type: "page-type/episode",
  slug: "star-trek-voyager-s06e17",
  description:
    "Stardate: Unknown. The inhabitants of the holo-city of Fair Haven suspect the Voyager crew of having mystical powers when they witness the use of their futuristic technology.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-6"],
  position: 17,
  publishedAt: "2000-02-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113347",
      externalLink: "https://www.themoviedb.org/tv/1855/season/6/episode/17",
    },
  ],
  title: "Spirit Folk",
  episodeType: "standard",
  stillPath: "/jLyTf2GPWAIK7k29wvLZjJIwCk1.jpg",
  voteAverage: 5.8,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
