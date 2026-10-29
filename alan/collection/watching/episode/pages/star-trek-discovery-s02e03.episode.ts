import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS02e03 = {
  id: "01a18852-a9f6-7b27-bd82-81cf648b8547",
  type: "page-type/episode",
  slug: "star-trek-discovery-s02e03",
  description:
    "A surprise visitor to the U.S.S. Discovery brings shocking news about Spock and dredges up past regrets for Burnham. Following the asteroid incident, Tilly struggles to keep a grip on her reality. L'Rell's authority on Qo'noS is threatened.",
  ownLength: 49,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-2"],
  position: 3,
  publishedAt: "2019-01-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1682134",
      externalLink: "https://www.themoviedb.org/tv/67198/season/2/episode/3",
    },
  ],
  title: "Point of Light",
  episodeType: "standard",
  stillPath: "/8bIaq84ymAVLOX3fw5CmxyvX2oi.jpg",
  voteAverage: 5.8,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
