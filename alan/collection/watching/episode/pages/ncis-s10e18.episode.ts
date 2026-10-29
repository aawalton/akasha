import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS10e18 = {
  id: "01a1884b-ef70-7709-8be8-f103e4a2fa6a",
  type: "page-type/episode",
  slug: "ncis-s10e18",
  description:
    "A widowed Marine wife, whose husband was seemingly killed by a Taliban sniper, asks Gibbs for help to find out the truth.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-10"],
  position: 18,
  publishedAt: "2013-03-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334689",
      externalLink: "https://www.themoviedb.org/tv/4614/season/10/episode/18",
    },
  ],
  title: "Seek",
  episodeType: "standard",
  stillPath: "/cEwZQAPRUKxCedTDp3qBUqwv5e3.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
