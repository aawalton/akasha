import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS06e18 = {
  id: "01a18857-c36b-7296-ac6d-94b545e4f361",
  type: "page-type/episode",
  slug: "the-office-s06e18",
  description:
    'When the sales staff lets Sabre\'s new "sales is king" policy get to their heads, Michael hides their new, prized leads.',
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-6"],
  position: 18,
  publishedAt: "2010-03-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170199",
      externalLink: "https://www.themoviedb.org/tv/2316/season/6/episode/18",
    },
  ],
  title: "New Leads",
  episodeType: "standard",
  stillPath: "/56hRdwaPs3rKIJUSEL8RJFA3SgA.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
