import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS22e18 = {
  id: "01a1884b-ef84-7004-af27-7562fc40d7eb",
  type: "page-type/episode",
  slug: "ncis-s22e18",
  description:
    "When a trio of combat vets are found murdered in a D.C. motel room, NCIS tracks down a suspect who refuses to talk to anyone but Sam Hanna.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-22"],
  position: 18,
  publishedAt: "2025-04-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6052060",
      externalLink: "https://www.themoviedb.org/tv/4614/season/22/episode/18",
    },
  ],
  title: "After the Storm",
  episodeType: "standard",
  stillPath: "/7vPwjXpEzzos10yM9saCQoK27Ap.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
