import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS04e05 = {
  id: "01a18857-c368-77ca-8d41-838f6bffb641",
  type: "page-type/episode",
  slug: "the-office-s04e05",
  description:
    "Michael was excited to know Dunder Mifflin bought television ad space in local markets, including Scranton. Michael wanted to create the perfect commercial. Only problem was Michael wasn't seeing eye to eye with guys who were going to be producing the commercial.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-4"],
  position: 5,
  publishedAt: "2007-10-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170237",
      externalLink: "https://www.themoviedb.org/tv/2316/season/4/episode/5",
    },
  ],
  title: "Local Ad",
  episodeType: "standard",
  stillPath: "/8Ta75t1XPJpOtOtfaOrAcD2yLWD.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
