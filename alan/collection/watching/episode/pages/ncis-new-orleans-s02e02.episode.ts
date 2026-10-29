import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS02e02 = {
  id: "01a1884b-3016-7972-863a-8e8c49c89d25",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s02e02",
  description:
    "The NCIS team investigates the murder of a blogger dedicated to exposing government corruption and cover-ups and discovers a Navy Seal and CIA humanitarian mission with a dark secret.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-2"],
  position: 2,
  publishedAt: "2015-09-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1109436",
      externalLink: "https://www.themoviedb.org/tv/61387/season/2/episode/2",
    },
  ],
  title: "Shadow Unit",
  episodeType: "standard",
  stillPath: "/8iVzmKbGElhLrYqR39vAm4FCGHz.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
