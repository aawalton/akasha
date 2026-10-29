import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS02e18 = {
  id: "01a1884b-3017-717d-997b-089860f514ea",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s02e18",
  description:
    "Brody realizes that there is a connection between the case of a sailor hit by a party bus and the death of her sister.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-2"],
  position: 18,
  publishedAt: "2016-03-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1169282",
      externalLink: "https://www.themoviedb.org/tv/61387/season/2/episode/18",
    },
  ],
  title: "If It Bleeds, It Leads",
  episodeType: "standard",
  stillPath: "/iFJfEDY1KIOXt0R6J12heAQ0gpY.jpg",
  voteAverage: 5.7,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
