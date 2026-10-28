import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const samuraiChamplooS01e01 = {
  id: "01a183dd-7326-748c-b017-79e247d66bf4",
  type: "page-type/episode",
  slug: "samurai-champloo-s01e01",
  description:
    "Fuu is a part-time teahouse worker whose life changes forever when two vagabond warriors, Mugen and Jin, stumble into her place of business and end up in hot water with the local magistrate.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/samurai-champloo-season-1"],
  position: 1,
  publishedAt: "2004-05-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "55652",
      externalLink: "https://www.themoviedb.org/tv/1063/season/1/episode/1",
    },
  ],
  title: "Tempestuous Temperaments",
  episodeType: "standard",
  stillPath: "/zTXGRMkIVwPNdHKaua72IBiANrV.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:54:50.662Z",
  updatedAt: "2026-10-28T18:54:50.662Z",
} as const satisfies Episode
