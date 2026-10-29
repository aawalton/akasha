import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS11e09 = {
  id: "01a1884a-e0f4-7912-b23c-b332e7649cd3",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s11e09",
  description:
    "Callen and Sam travel to San Francisco to search for Beale after he's kidnapped during a clandestine mission for Hetty.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-11"],
  position: 9,
  publishedAt: "2019-11-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1993930",
      externalLink: "https://www.themoviedb.org/tv/17610/season/11/episode/9",
    },
  ],
  title: "Kill Beale: Vol. 1",
  episodeType: "standard",
  stillPath: "/y29Md6LYPXeyTsdYzwu4CDISWlT.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
