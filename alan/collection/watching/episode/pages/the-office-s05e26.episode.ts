import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS05e26 = {
  id: "01a18857-c36a-73cd-9ffd-0f12a812fb9d",
  type: "page-type/episode",
  slug: "the-office-s05e26",
  description:
    "At the company picnic, Michael and Holly are reunited for the first time since their split. The rest of the staff competes in games, such as the volleyball tournament.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-5"],
  position: 26,
  publishedAt: "2009-05-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170227",
      externalLink: "https://www.themoviedb.org/tv/2316/season/5/episode/26",
    },
  ],
  title: "Company Picnic",
  episodeType: "finale",
  stillPath: "/zMpnRyb5DAnizp5UHmLT94Afru1.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
