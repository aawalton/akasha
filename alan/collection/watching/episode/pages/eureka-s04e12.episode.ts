import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS04e12 = {
  id: "01a18848-3733-7c89-92ac-7c85140a3f1b",
  type: "page-type/episode",
  slug: "eureka-s04e12",
  description:
    "Carter's duties expand to babysitting when Allison attends a medical conference, and Fargo finds his groove when a certain song is played. Meanwhile, a rocket scientist appears at Café Diem.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-4"],
  position: 12,
  publishedAt: "2011-07-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335281",
      externalLink: "https://www.themoviedb.org/tv/4620/season/4/episode/12",
    },
  ],
  title: "Reprise",
  episodeType: "standard",
  stillPath: "/japH01xGBXpa8gUOQRrMtDPMKyq.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
