import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS07e05 = {
  id: "01a1884a-e0ef-75ac-be67-c1a61288da55",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s07e05",
  description:
    "NCIS Special Agent DiNozzo partners with the NCIS: Los Angeles team to search the city after his prisoner escapes custody on a flight from Singapore to Los Angeles.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-7"],
  position: 5,
  publishedAt: "2015-10-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1116812",
      externalLink: "https://www.themoviedb.org/tv/17610/season/7/episode/5",
    },
  ],
  title: "Blame It on Rio",
  episodeType: "standard",
  stillPath: "/ddAShef0p7WSJxFB5WVLCGXSywD.jpg",
  voteAverage: 6.1,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
