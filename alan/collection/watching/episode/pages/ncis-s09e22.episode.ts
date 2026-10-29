import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS09e22 = {
  id: "01a1884b-ef6f-7e54-a923-12263e79fc61",
  type: "page-type/episode",
  slug: "ncis-s09e22",
  description:
    "The NCIS investigation of a fire on a Navy vessel reveals evidence that elevates security at all U.S. Navy facilities worldwide.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-9"],
  position: 22,
  publishedAt: "2012-05-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334611",
      externalLink: "https://www.themoviedb.org/tv/4614/season/9/episode/22",
    },
  ],
  title: "Playing with Fire",
  episodeType: "standard",
  stillPath: "/vMltrptEhkPeCdPnn5Ns4iHCeVU.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
