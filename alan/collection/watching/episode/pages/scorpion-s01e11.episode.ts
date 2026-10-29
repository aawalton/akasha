import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const scorpionS01e11 = {
  id: "01a1887f-56d1-769c-abf2-1523a4651afa",
  type: "page-type/episode",
  slug: "scorpion-s01e11",
  description:
    "When Sylvester accidentally triggers an explosive device during an investigation, Team Scorpion must focus on finding who's responsible even while their friend's life hangs in the balance.",
  ownLength: 40,
  ownProgress: 40,
  partOfCollections: ["season/scorpion-season-1"],
  position: 11,
  publishedAt: "2014-12-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1017201",
      externalLink: "https://www.themoviedb.org/tv/60797/season/1/episode/11",
    },
  ],
  title: "Revenge",
  episodeType: "standard",
  stillPath: "/A2GcCC467NlOoOwgpanx4rxbXqs.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T16:30:09.105Z",
  updatedAt: "2026-10-29T16:30:09.105Z",
} as const satisfies Episode
