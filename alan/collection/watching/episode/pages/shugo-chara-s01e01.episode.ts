import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const shugoCharaS01e01 = {
  id: "01a183d9-d68d-7d76-9cc9-bef67709fabc",
  type: "page-type/episode",
  slug: "shugo-chara-s01e01",
  description:
    'People view Amu Hinamori as a "cool and spicy" girl; she is actually timid and easily scared. When she wishes to have the courage to show her "true" self, she discovers three colorful eggs -red, blue, and green- in her bed. At school, the eggs draw the attention of Tadase Hotori, the most popular boy in school, who Amu has a crush on.',
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/shugo-chara-season-1"],
  position: 1,
  publishedAt: "2007-10-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "519728",
      externalLink: "https://www.themoviedb.org/tv/14451/season/1/episode/1",
    },
  ],
  title: "A Guardian Character is Born!",
  episodeType: "standard",
  stillPath: "/ab75I9Jj1lOzfZ66oHdrbDbY0Iu.jpg",
  voteAverage: 0,
  createdAt: "2026-10-28T18:50:53.965Z",
  updatedAt: "2026-10-28T18:50:53.965Z",
} as const satisfies Episode
