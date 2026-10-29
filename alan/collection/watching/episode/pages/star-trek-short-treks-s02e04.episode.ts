import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekShortTreksS02e04 = {
  id: "01a18853-28f0-7202-9acb-672373ac5338",
  type: "page-type/episode",
  slug: "star-trek-short-treks-s02e04",
  description:
    "Ephraim, a humble tardigrade, is flying through the mycelial network when an unexpected encounter takes her on a bewildering adventure through space.",
  ownLength: 9,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-short-treks-season-2"],
  position: 4,
  publishedAt: "2019-12-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1947031",
      externalLink: "https://www.themoviedb.org/tv/82491/season/2/episode/4",
    },
  ],
  title: "Ephraim and Dot",
  episodeType: "standard",
  stillPath: "/iNk4oBpyyqzSLZiKKoWwaPajDYe.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:41:53.775Z",
  updatedAt: "2026-10-29T15:41:53.775Z",
} as const satisfies Episode
