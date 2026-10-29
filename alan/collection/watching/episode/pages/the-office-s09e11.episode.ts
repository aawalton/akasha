import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS09e11 = {
  id: "01a18857-c36f-7e3d-9904-542cec4a4186",
  type: "page-type/episode",
  slug: "the-office-s09e11",
  description:
    "Clark brings an espresso maker to the office. Dwight and Clark pretend to be a father-and-son to land a sale. Darryl goes on an interview at Jim's company, where Pam drops by unexpectedly.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-9"],
  position: 11,
  publishedAt: "2013-01-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170325",
      externalLink: "https://www.themoviedb.org/tv/2316/season/9/episode/11",
    },
  ],
  title: "Suit Warehouse",
  episodeType: "standard",
  stillPath: "/gUtF2A9EfkdthCrlxTnqd0sXRpO.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
