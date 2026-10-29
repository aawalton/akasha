import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS19e03 = {
  id: "01a1884b-ef7c-7ec9-859f-12a5debc0465",
  type: "page-type/episode",
  slug: "ncis-s19e03",
  description:
    "Gibbs and Parker go on a road trip to find one of the serial killer's victims. Also, Agent Knight goes undercover at a large manufacturing company with ties to the murders.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-19"],
  position: 3,
  publishedAt: "2021-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3224876",
      externalLink: "https://www.themoviedb.org/tv/4614/season/19/episode/3",
    },
  ],
  title: "Road to Nowhere",
  episodeType: "standard",
  stillPath: "/wDw3VKbxW6qr5wSwhpnA7XA7dWc.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
