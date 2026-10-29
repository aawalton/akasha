import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS08e18 = {
  id: "01a18857-c36e-7485-af18-140742015dcc",
  type: "page-type/episode",
  slug: "the-office-s08e18",
  description:
    "Jim comes to Dwight's rescue when Robert slams the plan for the Sabre Store concept. Andy discovers Erin doesn't plan to return to Scranton.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-8"],
  position: 18,
  publishedAt: "2012-03-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170303",
      externalLink: "https://www.themoviedb.org/tv/2316/season/8/episode/18",
    },
  ],
  title: "Last Day in Florida",
  episodeType: "standard",
  stillPath: "/kRthYgk84trb5gGtS6kO0LhzvXS.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
