import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const junjoRomanticaS03e01 = {
  id: "01a183d6-be6c-764d-8be2-83ab1c57bb6b",
  type: "page-type/episode",
  slug: "junjo-romantica-s03e01",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/junjo-romantica-season-3"],
  position: 1,
  publishedAt: "2015-07-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1332104",
      externalLink: "https://www.themoviedb.org/tv/37548/season/3/episode/1",
    },
  ],
  title: '"All Good Things Must Come to an End"  "Hana ni Arashi" (花に嵐)',
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-28T18:47:31.178Z",
  updatedAt: "2026-10-28T18:47:31.178Z",
} as const satisfies Episode
