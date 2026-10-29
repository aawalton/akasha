import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS07e19 = {
  id: "01a18844-d7ef-7533-b280-9a01c8dc1cf3",
  type: "page-type/episode",
  slug: "criminal-minds-s07e19",
  description:
    "The BAU team heads to Oregon to investigate a series of gothic, ritualistic murders.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-7"],
  position: 19,
  publishedAt: "2012-04-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283372",
      externalLink: "https://www.themoviedb.org/tv/4057/season/7/episode/19",
    },
  ],
  title: "Heathridge Manor",
  episodeType: "standard",
  stillPath: "/rFXY1IsMueb4jQCL3LdXChJMQg6.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
