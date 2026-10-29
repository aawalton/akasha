import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS12e10 = {
  id: "01a1884a-e0f5-7a54-a7ef-05a915858d11",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s12e10",
  description:
    "When Sam’s daughter Kam is kidnapped after leading citywide protests he will stop at nothing to find her. Also  Deeks rejoins NCIS and Callen searches for answers about Anna",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-12"],
  position: 10,
  publishedAt: "2021-02-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2615617",
      externalLink: "https://www.themoviedb.org/tv/17610/season/12/episode/10",
    },
  ],
  title: "The Frogman’s Daughter",
  episodeType: "standard",
  stillPath: "/4rtMTNdHiYsug20FBpTPYz32Ajn.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
