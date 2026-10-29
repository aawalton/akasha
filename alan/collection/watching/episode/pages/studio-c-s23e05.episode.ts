import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS23e05 = {
  id: "01a18855-c2a1-7384-9ce6-9f2fb35a8fe5",
  type: "page-type/episode",
  slug: "studio-c-s23e05",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-23"],
  position: 5,
  publishedAt: "2026-11-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7785654",
      externalLink: "https://www.themoviedb.org/tv/68207/season/23/episode/5",
    },
  ],
  title: "A Battle of Wits",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
