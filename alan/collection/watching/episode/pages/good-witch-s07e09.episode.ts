import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS07e09 = {
  id: "01a18849-352b-77e0-ac0e-8f46127ed28a",
  type: "page-type/episode",
  slug: "good-witch-s07e09",
  description:
    "The pressure is on because strange things start happening to Cassie, Abigail and Joy's abilities, adding urgency to finding a Merriwick family heirloom.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-7"],
  position: 9,
  publishedAt: "2021-07-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3062495",
      externalLink: "https://www.themoviedb.org/tv/61864/season/7/episode/9",
    },
  ],
  title: "The Search",
  episodeType: "standard",
  voteAverage: 5,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
