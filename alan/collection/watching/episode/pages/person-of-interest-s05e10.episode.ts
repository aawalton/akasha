import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS05e10 = {
  id: "01a18851-3df8-7b29-9524-4c029d6dd804",
  type: "page-type/episode",
  slug: "person-of-interest-s05e10",
  description:
    "Finch’s number comes up when a fatal error blows his cover identity and sets off a deadly series of escalating encounters with Samaritan’s operatives.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-5"],
  position: 10,
  publishedAt: "2016-05-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1176506",
      externalLink: "https://www.themoviedb.org/tv/1411/season/5/episode/10",
    },
  ],
  title: "The Day the World Went Away",
  episodeType: "standard",
  stillPath: "/jG2xTBdnJVippptD0RFlrWjfh56.jpg",
  voteAverage: 9,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
