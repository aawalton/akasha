import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theExpanseS02e01 = {
  id: "01a18857-1f7b-7ce3-a29c-f96ee1030565",
  type: "page-type/episode",
  slug: "the-expanse-s02e01",
  description:
    "Unlikely allies Joe Miller and the crew of the Rocinante led by Jim Holden uncover more about the conspiracy to release the protomolecule on Eros station.",
  ownLength: 48,
  ownProgress: 0,
  partOfCollections: ["season/the-expanse-season-2"],
  position: 1,
  publishedAt: "2017-02-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1218828",
      externalLink: "https://www.themoviedb.org/tv/63639/season/2/episode/1",
    },
  ],
  title: "Safe",
  episodeType: "standard",
  stillPath: "/zNfP3vPgNiFQMAu5RyerLumstsb.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:46:13.498Z",
  updatedAt: "2026-10-29T15:46:13.498Z",
} as const satisfies Episode
