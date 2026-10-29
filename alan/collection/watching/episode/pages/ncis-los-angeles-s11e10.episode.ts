import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS11e10 = {
  id: "01a1884a-e0f4-7366-8645-dc6dc9c44fb6",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s11e10",
  description:
    "Akhos Laos , a former black ops agent originally recruited and trained by Hetty Lange, returns to seek revenge on Hetty for the life she introduced him to, on the 250th episode",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-11"],
  position: 10,
  publishedAt: "2019-12-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1997201",
      externalLink: "https://www.themoviedb.org/tv/17610/season/11/episode/10",
    },
  ],
  title: "Mother",
  episodeType: "standard",
  stillPath: "/ckJlqktiQ3ryB1he4byJb11jDaC.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
