import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const sherlockS03e03 = {
  id: "01a1887f-adf0-7872-813f-af512fe5a641",
  type: "page-type/episode",
  slug: "sherlock-s03e03",
  description:
    "A case of stolen letters leads Sherlock Holmes into a long conflict with Charles Augustus Magnussen, the Napoleon of blackmail, and the one man he truly hates. But how do you tackle a foe who knows the personal weakness of every person of importance in the Western world?",
  ownLength: 90,
  ownProgress: 90,
  partOfCollections: ["season/sherlock-season-3"],
  position: 3,
  publishedAt: "2014-01-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "578723",
      externalLink: "https://www.themoviedb.org/tv/19885/season/3/episode/3",
    },
  ],
  title: "His Last Vow",
  episodeType: "finale",
  stillPath: "/5phdYWQXMwn9cBUPzUt1Z3oie4K.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T16:30:31.407Z",
  updatedAt: "2026-10-29T16:30:31.407Z",
} as const satisfies Episode
