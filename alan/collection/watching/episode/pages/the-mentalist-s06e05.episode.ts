import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS06e05 = {
  id: "01a18880-75eb-7072-8979-51abe5258830",
  type: "page-type/episode",
  slug: "the-mentalist-s06e05",
  description:
    "When a prominent member of Visualize is mysteriously killed, Jane investigates in the hopes that the case will provide a clue that will lead him to Red John.",
  ownLength: 41,
  ownProgress: 41,
  partOfCollections: ["season/the-mentalist-season-6"],
  position: 5,
  publishedAt: "2013-10-27",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367813",
      externalLink: "https://www.themoviedb.org/tv/5920/season/6/episode/5",
    },
  ],
  title: "The Red Tattoo",
  episodeType: "standard",
  stillPath: "/Any1WOHG9kYpm4zKiqZoD2dtPCd.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
