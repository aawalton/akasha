import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS05e09 = {
  id: "01a18857-c369-75f3-b133-a79f287de033",
  type: "page-type/episode",
  slug: "the-office-s05e09",
  description:
    "Michael has to spend the office surplus by they end of the day, but he can't decide between a copier or new chairs. Dwight plays a dirty trick on Angela as they prepare for Andy and Angela's wedding on the beet farm.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-5"],
  position: 9,
  publishedAt: "2008-12-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170215",
      externalLink: "https://www.themoviedb.org/tv/2316/season/5/episode/9",
    },
  ],
  title: "The Surplus",
  episodeType: "standard",
  stillPath: "/bsUeqc6zOCalANRvl7VfoJcj68n.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
