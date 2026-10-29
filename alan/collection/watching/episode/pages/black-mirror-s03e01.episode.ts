import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackMirrorS03e01 = {
  id: "01a18843-982a-7ce2-9a94-c4963a2cd2d0",
  type: "page-type/episode",
  slug: "black-mirror-s03e01",
  description:
    "A woman desperate to boost her social media score hits the jackpot when she's invited to a swanky wedding. But the trip doesn't go as planned.",
  ownLength: 63,
  ownProgress: 0,
  partOfCollections: ["season/black-mirror-season-3"],
  position: 1,
  publishedAt: "2016-10-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1226006",
      externalLink: "https://www.themoviedb.org/tv/42009/season/3/episode/1",
    },
  ],
  title: "Nosedive",
  episodeType: "standard",
  stillPath: "/dmEDQliQbapSOcbdu0c2KtmIVna.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:24:53.673Z",
  updatedAt: "2026-10-29T15:24:53.673Z",
} as const satisfies Episode
