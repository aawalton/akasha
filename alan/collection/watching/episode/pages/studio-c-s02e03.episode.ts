import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS02e03 = {
  id: "01a18885-00f9-77f5-ab76-6816b4a7beee",
  type: "page-type/episode",
  slug: "studio-c-s02e03",
  description:
    "Poker players give their inner thoughts, Ann helps a visitor find a good book, and the police chief tries to protect innocent ears.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-2"],
  position: 3,
  publishedAt: "2013-04-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1383565",
      externalLink: "https://www.themoviedb.org/tv/68207/season/2/episode/3",
    },
  ],
  title: "Season 2 Episode 3",
  episodeType: "standard",
  stillPath: "/4YgdoYNDfaDapB1f3NYAieh3la2.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
