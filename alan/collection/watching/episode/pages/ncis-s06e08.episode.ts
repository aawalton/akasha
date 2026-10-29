import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS06e08 = {
  id: "01a1884b-ef68-7a2e-8075-196cab17a184",
  type: "page-type/episode",
  slug: "ncis-s06e08",
  description:
    "A strange delivery in a box arrives at a Navy facility. The delivery driver and a Navy MP officer discover it is a sailor's corpse.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-6"],
  position: 8,
  publishedAt: "2008-11-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334412",
      externalLink: "https://www.themoviedb.org/tv/4614/season/6/episode/8",
    },
  ],
  title: "Cloak",
  episodeType: "standard",
  stillPath: "/2gI7S7P08hr33UcqMQo5kzPN7TU.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
