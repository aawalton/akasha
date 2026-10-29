import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS10e11 = {
  id: "01a1884a-e0f3-7266-8dd4-48d1c48b0c53",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s10e11",
  description:
    "The NCIS team is joined by NCIS Special Agent Nicole DeChamps after a Marine reservist with a history of PTSD disappears following a drunk and disorderly altercation.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-10"],
  position: 11,
  publishedAt: "2018-12-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1626292",
      externalLink: "https://www.themoviedb.org/tv/17610/season/10/episode/11",
    },
  ],
  title: "Joyride",
  episodeType: "standard",
  stillPath: "/vSXQSrbir1noT7q2EHdR9HLtw0t.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
