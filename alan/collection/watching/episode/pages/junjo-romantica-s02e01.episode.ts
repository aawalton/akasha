import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const junjoRomanticaS02e01 = {
  id: "01a183d6-be6b-7c57-9f5c-e8ccfbada018",
  type: "page-type/episode",
  slug: "junjo-romantica-s02e01",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/junjo-romantica-season-2"],
  position: 1,
  publishedAt: "2008-10-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "848213",
      externalLink: "https://www.themoviedb.org/tv/37548/season/2/episode/1",
    },
  ],
  title: "What Happens Once Can Happen Twice",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-28T18:47:31.178Z",
  updatedAt: "2026-10-28T18:47:31.178Z",
} as const satisfies Episode
