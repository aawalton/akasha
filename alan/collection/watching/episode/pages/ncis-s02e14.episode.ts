import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS02e14 = {
  id: "01a1884b-ef64-72ab-8a16-c387f2e90c99",
  type: "page-type/episode",
  slug: "ncis-s02e14",
  description:
    "Erin Kendall claims to have seen a murder of a sailor in an apartment across from hers. Gibbs assigns the case to McGee who believes that he can resolve it himself. However, due to the lack of physical evidence, McGee turns to the team to help him.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-2"],
  position: 14,
  publishedAt: "2005-02-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334509",
      externalLink: "https://www.themoviedb.org/tv/4614/season/2/episode/14",
    },
  ],
  title: "Witness",
  episodeType: "standard",
  stillPath: "/bbfB1vwVUieWwjdQhkRfGUtdlJX.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
