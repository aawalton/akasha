import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS02e20 = {
  id: "01a18852-d431-740f-a881-dac3cda41a8a",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s02e20",
  description:
    "Mayweather discovers his father has died and that things on his old home, the E.C.S. Horizon, have greatly changed.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-2"],
  position: 20,
  publishedAt: "2003-04-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15578",
      externalLink: "https://www.themoviedb.org/tv/314/season/2/episode/20",
    },
  ],
  title: "Horizon",
  episodeType: "standard",
  stillPath: "/pP5xy0PmsyiElRXgZbu2ZEM2DBC.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
