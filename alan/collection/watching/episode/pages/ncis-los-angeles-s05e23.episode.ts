import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS05e23 = {
  id: "01a1884a-e0ed-736e-b5b5-4086a07e1414",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s05e23",
  description:
    "When a news reporter announces the group responsible for the deadly explosion at a military-sponsored charity event, the team must investigate her claims and search for the attacker.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-5"],
  position: 23,
  publishedAt: "2014-05-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "975322",
      externalLink: "https://www.themoviedb.org/tv/17610/season/5/episode/23",
    },
  ],
  title: "Exposure",
  episodeType: "standard",
  stillPath: "/lbwtlcTF7UmVaYusSzAUjobf20L.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
