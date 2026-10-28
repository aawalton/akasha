import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const vampireKnightS02e01 = {
  id: "01a183d8-f258-711a-94b5-6a5d7b5a0417",
  type: "page-type/episode",
  slug: "vampire-knight-s02e01",
  description:
    "After Shizuka Hio’s death, peace is restored at the academy. But when Zero returns, the vampires of the Senate accuse him of murder.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/vampire-knight-season-2"],
  position: 1,
  publishedAt: "2008-10-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "553036",
      externalLink: "https://www.themoviedb.org/tv/17149/season/2/episode/1",
    },
  ],
  title: "Burden of Sinners",
  episodeType: "standard",
  stillPath: "/mWk1UgRuwsJmMzw9wZl655pG2La.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:49:55.542Z",
  updatedAt: "2026-10-28T18:49:55.542Z",
} as const satisfies Episode
