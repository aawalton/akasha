import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const manifestS04e11 = {
  id: "01a1884a-400c-7432-aad9-eb57bdcf74a4",
  type: "page-type/episode",
  slug: "manifest-s04e11",
  description:
    "As the passengers adjust to a frustrating new reality, Ben and Michaela seize an opportunity to solve a Calling, with the Registry in hot pursuit.",
  ownLength: 48,
  ownProgress: 0,
  partOfCollections: ["season/manifest-season-4"],
  position: 11,
  publishedAt: "2023-06-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4350223",
      externalLink: "https://www.themoviedb.org/tv/79696/season/4/episode/11",
    },
  ],
  title: "Final Descent",
  episodeType: "standard",
  stillPath: "/wFjI5At1qCPsqctqO6YirFtuIJL.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:32:09.865Z",
  updatedAt: "2026-10-29T15:32:09.865Z",
} as const satisfies Episode
