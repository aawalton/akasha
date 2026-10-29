import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS13e14 = {
  id: "01a1884a-e0f6-7c3e-83eb-c2b42da31b96",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s13e14",
  description:
    "NCIS investigates the robbery of a high-end arts storage by going undercover as potential buyers on the black market, to find who is behind the stolen items.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-13"],
  position: 14,
  publishedAt: "2022-03-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3610289",
      externalLink: "https://www.themoviedb.org/tv/17610/season/13/episode/14",
    },
  ],
  title: "Pandora's Box",
  episodeType: "standard",
  stillPath: "/seS7wqOHRpzMlBNm8BX1aAcjC0t.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
