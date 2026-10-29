import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS06e10 = {
  id: "01a18853-ac91-7218-9742-c973b636e2b3",
  type: "page-type/episode",
  slug: "star-trek-voyager-s06e10",
  description:
    "Stardate: Unknown. On Earth, Lt. Reginald Barclay works on a way to contact Voyager, but grows  increasingly obsessed with his own holodeck simulation of the crew.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-6"],
  position: 10,
  publishedAt: "1999-12-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113313",
      externalLink: "https://www.themoviedb.org/tv/1855/season/6/episode/10",
    },
  ],
  title: "Pathfinder",
  episodeType: "standard",
  stillPath: "/3fATAjdnhnKsD6WVLKWU5MEPgd0.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
