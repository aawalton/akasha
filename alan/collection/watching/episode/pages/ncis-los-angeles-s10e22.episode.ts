import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS10e22 = {
  id: "01a1884a-e0f3-72d1-b871-fcb8c2e2f9d8",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s10e22",
  description:
    "The NCIS team travels to Cuba for an unsanctioned mission after Callen gets a lead on Anna Kolcheck's (Bar Paly) whereabouts.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-10"],
  position: 22,
  publishedAt: "2019-05-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773922",
      externalLink: "https://www.themoviedb.org/tv/17610/season/10/episode/22",
    },
  ],
  title: "No More Secrets",
  episodeType: "standard",
  stillPath: "/rpq6jgASlBFDFGmTgNHHJUOOPMn.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
