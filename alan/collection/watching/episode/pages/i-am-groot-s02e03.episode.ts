import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const iAmGrootS02e03 = {
  id: "01a1887e-c695-7c2f-8b06-c86925e5aca0",
  type: "page-type/episode",
  slug: "i-am-groot-s02e03",
  description:
    "After landing on the icy planet of Falligar, Groot fashions a snowman with scraps of junk, inadvertently creating an unstoppable snowman-robot that wreaks havoc.",
  ownLength: 5,
  ownProgress: 5,
  partOfCollections: ["season/i-am-groot-season-2"],
  position: 3,
  publishedAt: "2023-09-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4629241",
      externalLink: "https://www.themoviedb.org/tv/232125/season/2/episode/3",
    },
  ],
  title: "Groot's Snow Day",
  episodeType: "standard",
  stillPath: "/6H9lUVRUJyWn7t0VAix83TszrfJ.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T16:29:32.180Z",
  updatedAt: "2026-10-29T16:29:32.180Z",
} as const satisfies Episode
