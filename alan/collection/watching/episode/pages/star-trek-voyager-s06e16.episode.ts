import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS06e16 = {
  id: "01a18853-ac91-7c61-bbe5-4de0f2db2fa9",
  type: "page-type/episode",
  slug: "star-trek-voyager-s06e16",
  description:
    "Stardate: Unknown. Voyager encounters a damaged Borg cube run by immature would-be drones cut off from the Collective.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-6"],
  position: 16,
  publishedAt: "2000-02-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113331",
      externalLink: "https://www.themoviedb.org/tv/1855/season/6/episode/16",
    },
  ],
  title: "Collective",
  episodeType: "standard",
  stillPath: "/fOM93q6cuIyBtGhOym9xXdt3urT.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
