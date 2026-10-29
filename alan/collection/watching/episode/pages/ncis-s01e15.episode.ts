import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS01e15 = {
  id: "01a1884b-ef62-7cad-a1ce-98f76367f3fa",
  type: "page-type/episode",
  slug: "ncis-s01e15",
  description:
    "Gibbs risks his career when his former commanding officer is accused of stealing funds.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-1"],
  position: 15,
  publishedAt: "2004-02-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334444",
      externalLink: "https://www.themoviedb.org/tv/4614/season/1/episode/15",
    },
  ],
  title: "Enigma",
  episodeType: "standard",
  stillPath: "/9bZKlRpQ5IeZK7HxeR9HDMwvvPe.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
