import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS10e20 = {
  id: "01a1884b-ef70-7118-bfbd-bbd3fee679a5",
  type: "page-type/episode",
  slug: "ncis-s10e20",
  description:
    "While the team takes a missing person case, Tony is disturbed by Ziva's way of coping with her father's death.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-10"],
  position: 20,
  publishedAt: "2013-04-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334690",
      externalLink: "https://www.themoviedb.org/tv/4614/season/10/episode/20",
    },
  ],
  title: "Chasing Ghosts",
  episodeType: "standard",
  stillPath: "/mG9XKVQBDRKxKiWhuIwa7IMhfGi.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
