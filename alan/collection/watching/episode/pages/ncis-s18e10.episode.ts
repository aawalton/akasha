import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS18e10 = {
  id: "01a1884b-ef7a-744f-be28-82b628da4f53",
  type: "page-type/episode",
  slug: "ncis-s18e10",
  description:
    "NCIS uncovers a secret dogfighting ring, which leads to an unexpected move by one of the team members.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-18"],
  position: 10,
  publishedAt: "2021-03-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2704075",
      externalLink: "https://www.themoviedb.org/tv/4614/season/18/episode/10",
    },
  ],
  title: "Watchdog",
  episodeType: "standard",
  stillPath: "/pJa5aLufNKU23KqFO0tNw5f7iz6.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
