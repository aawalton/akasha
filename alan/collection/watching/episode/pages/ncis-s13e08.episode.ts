import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS13e08 = {
  id: "01a1884b-ef73-72fd-b528-988a55717ff6",
  type: "page-type/episode",
  slug: "ncis-s13e08",
  description:
    "DiNozzo is reunited with his ex-girlfriend, Jeanne Benoit, when insurgents in Sudan attack a group of volunteer doctors, including her husband.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-13"],
  position: 8,
  publishedAt: "2015-11-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1134600",
      externalLink: "https://www.themoviedb.org/tv/4614/season/13/episode/8",
    },
  ],
  title: "Saviors",
  episodeType: "standard",
  stillPath: "/mNOS9Er9RrBhP85RzCcNtxDMegJ.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
