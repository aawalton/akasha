import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS03e06 = {
  id: "01a1884a-e0ea-7176-b264-329cd97242da",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s03e06",
  description:
    "The NCIS team investigates the murder of a former Navy intelligence officer who had been living a double life and traveling overseas on false passports.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-3"],
  position: 6,
  publishedAt: "2011-10-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557331",
      externalLink: "https://www.themoviedb.org/tv/17610/season/3/episode/6",
    },
  ],
  title: "Lone Wolf",
  episodeType: "standard",
  stillPath: "/zbXMDyyAjf8pQ8l220U7FOmEKpC.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
