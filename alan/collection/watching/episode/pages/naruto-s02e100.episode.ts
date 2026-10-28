import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS02e100 = {
  id: "01a183d1-bb4e-7c4f-9c9d-1b9578b3ac5b",
  type: "page-type/episode",
  slug: "naruto-s02e100",
  description:
    "As Lee decides whether or not to go through with the operation, Gai decides to give him some motivation. Meanwhile, Tsunade frantically struggles to increase the operation's success rate.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-2"],
  position: 100,
  publishedAt: "2004-09-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1151749",
      externalLink: "https://www.themoviedb.org/tv/46260/season/2/episode/100",
    },
  ],
  title: "Sensei and Student: The Bond of a Shinobi!",
  episodeType: "standard",
  stillPath: "/nTFASe9GNI4DVvuKa1Fnix6lGmF.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
