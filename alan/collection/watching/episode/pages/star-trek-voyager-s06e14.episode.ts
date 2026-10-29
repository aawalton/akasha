import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS06e14 = {
  id: "01a18853-ac91-7c48-91b5-b6d555d703f8",
  type: "page-type/episode",
  slug: "star-trek-voyager-s06e14",
  description:
    "Stardate: Unknown. The crew of Voyager experience vivid memories and dreams of a battle they don't remember having, with an enemy they have never encountered.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-6"],
  position: 14,
  publishedAt: "2000-02-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113329",
      externalLink: "https://www.themoviedb.org/tv/1855/season/6/episode/14",
    },
  ],
  title: "Memorial",
  episodeType: "standard",
  stillPath: "/qmTVvVzUQvhMSrGgLJvtX5iBWeP.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
