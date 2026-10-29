import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS03e33 = {
  id: "01a18843-d155-7bcd-a384-b226a8785d97",
  type: "page-type/episode",
  slug: "bluey-s03e33",
  description:
    "Muffin is playing Grouchy Granny on an old mobility scooter at a garage sale, but a real granny wants to buy it!",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-3"],
  position: 33,
  publishedAt: "2022-06-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3781875",
      externalLink: "https://www.themoviedb.org/tv/82728/season/3/episode/33",
    },
  ],
  title: "Granny Mobile",
  episodeType: "standard",
  stillPath: "/txe8CY65fa7sbE4orBSh16g7EUB.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
