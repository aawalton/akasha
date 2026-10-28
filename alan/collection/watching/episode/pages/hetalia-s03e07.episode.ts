import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS03e07 = {
  id: "01a183d7-7ce2-7aef-a1b1-a017d39a65eb",
  type: "page-type/episode",
  slug: "hetalia-s03e07",
  description:
    "Hungary hears a message from God telling her to hit France with a frying pan. In other stories: England attempts to become stronger, and Italy visits France.",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-3"],
  position: 7,
  publishedAt: "2010-05-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797726",
      externalLink: "https://www.themoviedb.org/tv/35138/season/3/episode/7",
    },
  ],
  title: "Big Brother France and the Frying Pan",
  episodeType: "standard",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
