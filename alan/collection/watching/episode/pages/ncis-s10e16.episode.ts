import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS10e16 = {
  id: "01a1884b-ef70-7340-be0a-0d63fb5f50b8",
  type: "page-type/episode",
  slug: "ncis-s10e16",
  description:
    "The NCIS team races to track down Ducky and Jimmy after the two disappear while transporting a body from a crime scene.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-10"],
  position: 16,
  publishedAt: "2013-02-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334685",
      externalLink: "https://www.themoviedb.org/tv/4614/season/10/episode/16",
    },
  ],
  title: "Detour",
  episodeType: "standard",
  stillPath: "/2tpiqGhU4TMkLijvWy8vcwD4yYc.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
