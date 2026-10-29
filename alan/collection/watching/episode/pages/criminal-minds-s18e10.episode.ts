import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS18e10 = {
  id: "01a18844-d7fb-71a4-bb59-b5e75a3f65c4",
  type: "page-type/episode",
  slug: "criminal-minds-s18e10",
  description:
    'After Voit and Ochoa are kidnapped by "The Disciple", the team races to find them. While in The Disciple\'s custody, Voit wrestles with keeping the monster inside him at bay.',
  ownLength: 55,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-18-evolution-season-3"],
  position: 10,
  publishedAt: "2025-07-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6047502",
      externalLink: "https://www.themoviedb.org/tv/4057/season/18/episode/10",
    },
  ],
  title: "The Disciple",
  episodeType: "finale",
  stillPath: "/mVs0sS6YiHpXmFFZ2lxdbBF2Zkn.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
