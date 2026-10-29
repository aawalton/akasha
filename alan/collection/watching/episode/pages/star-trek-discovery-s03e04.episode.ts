import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS03e04 = {
  id: "01a18852-a9f6-7786-98ed-f664f7e8b5d6",
  type: "page-type/episode",
  slug: "star-trek-discovery-s03e04",
  description:
    "Burnham and Adira visit the Trill homeworld while Saru's efforts on the Discovery to help the crew reconnect yield surprises.",
  ownLength: 55,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-3"],
  position: 4,
  publishedAt: "2020-11-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2387211",
      externalLink: "https://www.themoviedb.org/tv/67198/season/3/episode/4",
    },
  ],
  title: "Forget Me Not",
  episodeType: "standard",
  stillPath: "/2xdn4gmzN7iFRrR6YsTpXdBNwNx.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
