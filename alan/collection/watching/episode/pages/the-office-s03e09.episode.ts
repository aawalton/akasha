import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS03e09 = {
  id: "01a18857-c367-74e3-a751-ef6169127954",
  type: "page-type/episode",
  slug: "the-office-s03e09",
  description:
    "Angela and Kevin were trying to figure out where extra money in the budget came from. Jan let them know it was money Dunder-Mifflin received for hiring an ex-convict. Michael swore he never hired an ex-convict. Jan informed him that the person must have come from the merger.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-3"],
  position: 9,
  publishedAt: "2006-11-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170166",
      externalLink: "https://www.themoviedb.org/tv/2316/season/3/episode/9",
    },
  ],
  title: "The Convict",
  episodeType: "standard",
  stillPath: "/tXSXCnQ1oV39SxqOSvnpOrJUGjx.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
