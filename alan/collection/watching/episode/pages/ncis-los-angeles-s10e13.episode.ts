import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS10e13 = {
  id: "01a1884a-e0f3-77a1-ad1c-04f03a6d4f3c",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s10e13",
  description:
    "The NCIS team works with the Global Criminal Tribunal when a Syrian seeking justice, David Sarraf, is brutally attacked while delivering evidence that would prove chemical weapons were used on civilians. Also, Kensi stays at the crime scene and comforts Sarraf who is pinned behind a vehicle.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-10"],
  position: 13,
  publishedAt: "2019-01-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1646234",
      externalLink: "https://www.themoviedb.org/tv/17610/season/10/episode/13",
    },
  ],
  title: "Better Angels",
  episodeType: "standard",
  stillPath: "/uE551YaAOXMnLgPH0CUkbIekxn0.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
