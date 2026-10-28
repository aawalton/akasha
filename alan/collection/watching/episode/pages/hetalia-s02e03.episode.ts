import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS02e03 = {
  id: "01a183d7-7ce0-7fff-a7f2-be870d7d4fee",
  type: "page-type/episode",
  slug: "hetalia-s02e03",
  description:
    "Russia decides to jump out of a plane without a parachute, and England and France comment on how he broke all his bones. Then, the audience is introduced to the Baltics, although Latvia has a tendency to say the wrong thing at times. After that, America injures himself when England offers him some ice cream.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-2"],
  position: 3,
  publishedAt: "2009-08-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797696",
      externalLink: "https://www.themoviedb.org/tv/35138/season/2/episode/3",
    },
  ],
  title: "Vodka and Parachutes",
  episodeType: "standard",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
