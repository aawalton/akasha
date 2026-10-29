import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS11e02 = {
  id: "01a1884a-e0f4-7b89-b0da-5640d1d6e0b5",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s11e02",
  description:
    "Faced with multiple cases worldwide, the NCIS team splits up, with Callen and Sam working with Mossad Agent Eliana Sapir in Tel Aviv, and Kensi partnering with DOJ Agent Lance Hamilton in Los Angeles.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-11"],
  position: 2,
  publishedAt: "2019-10-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1932407",
      externalLink: "https://www.themoviedb.org/tv/17610/season/11/episode/2",
    },
  ],
  title: "Decoy",
  episodeType: "standard",
  stillPath: "/3OfjubhTLArSgcfAjgRPpKFLZzr.jpg",
  voteAverage: 5.8,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
