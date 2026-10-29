import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS22e04 = {
  id: "01a18855-c2a1-7bd0-ab99-73c7d28928a6",
  type: "page-type/episode",
  slug: "studio-c-s22e04",
  description:
    "Steve Jobs unveils the first iPhone. A joking dad can't handle a joking waitress. A man brands himself as a wizard instead of a witch. A woman tries to relate to her co-workers. Benjamin Franklin and son experiment with electricity.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-22"],
  position: 4,
  publishedAt: "2026-04-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7070762",
      externalLink: "https://www.themoviedb.org/tv/68207/season/22/episode/4",
    },
  ],
  title: "Salem Wizard Trials",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
