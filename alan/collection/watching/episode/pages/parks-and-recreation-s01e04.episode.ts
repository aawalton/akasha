import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const parksAndRecreationS01e04 = {
  id: "01a18850-f8ba-7a06-8960-f401999e14b4",
  type: "page-type/episode",
  slug: "parks-and-recreation-s01e04",
  description:
    'Leslie attempts to break into the political "old boy\'s club," causing an ethical dilemma. Meanwhile, Andy plans a surprise for Ann.',
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/parks-and-recreation-season-1"],
  position: 4,
  publishedAt: "2009-04-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "397624",
      externalLink: "https://www.themoviedb.org/tv/8592/season/1/episode/4",
    },
  ],
  title: "Boys' Club",
  episodeType: "standard",
  stillPath: "/4Bc1CKAwm8lezkq4Hcg99qTw4oH.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:39:30.361Z",
  updatedAt: "2026-10-29T15:39:30.361Z",
} as const satisfies Episode
