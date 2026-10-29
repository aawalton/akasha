import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS02e01 = {
  id: "01a18849-3527-7b91-9f54-7a20770c0be5",
  type: "page-type/episode",
  slug: "good-witch-s02e01",
  description:
    "Cassie and Sam decide to take a step forward, but his pushy ex-wife stalls them at the starting gate. Grace preps for the teenage rite of passage -- her driving test.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-2"],
  position: 1,
  publishedAt: "2016-04-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1132313",
      externalLink: "https://www.themoviedb.org/tv/61864/season/2/episode/1",
    },
  ],
  title: "Second Time Around",
  episodeType: "standard",
  stillPath: "/kr3vRlMwrX9nzRvLFPY8rtaRFKg.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
