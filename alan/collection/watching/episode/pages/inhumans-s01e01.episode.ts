import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const inhumansS01e01 = {
  id: "01a18849-ba0e-7259-b12d-81665adb7871",
  type: "page-type/episode",
  slug: "inhumans-s01e01",
  description:
    "A wounded man flees to Hotel Inhumans, where they cater to a certain clientele and the concierges are skilled.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-inhumans-season-1"],
  position: 1,
  publishedAt: "2025-07-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5738140",
      externalLink: "https://www.themoviedb.org/tv/276288/season/1/episode/1",
    },
  ],
  title: "Sister Sister",
  episodeType: "standard",
  stillPath: "/rgfGtxhZb2m92vYhPE7WXzINcTX.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:31:35.566Z",
  updatedAt: "2026-10-29T15:31:35.566Z",
} as const satisfies Episode
