import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS22e03 = {
  id: "01a18855-c2a1-73ca-aa5a-4b4e8e023cb5",
  type: "page-type/episode",
  slug: "studio-c-s22e03",
  description:
    "Philosophers order the alphabet. A film festival Q&A poses unexpected questions. In a true crime special, 7 is the suspect when 9 goes missing. A cop bribes witnesses for information. Tam Flank returns, but as an exterminator.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-22"],
  position: 3,
  publishedAt: "2026-04-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7070761",
      externalLink: "https://www.themoviedb.org/tv/68207/season/22/episode/3",
    },
  ],
  title: "Seven Ate Nine",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
