import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS01e10 = {
  id: "01a1884b-3015-7268-b69b-34d357751bf5",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s01e10",
  description:
    "A retired SEAL who tracked people fraudulently impersonating military personnel is discovered dead.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-1"],
  position: 10,
  publishedAt: "2014-12-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1019784",
      externalLink: "https://www.themoviedb.org/tv/61387/season/1/episode/10",
    },
  ],
  title: "Stolen Valor",
  episodeType: "mid-season",
  stillPath: "/iNF9glNFt1NVt049qwFAN7k3y0m.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
