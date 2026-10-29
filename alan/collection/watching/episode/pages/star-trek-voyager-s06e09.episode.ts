import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS06e09 = {
  id: "01a18853-ac90-7e56-9ede-10e790ec6b56",
  type: "page-type/episode",
  slug: "star-trek-voyager-s06e09",
  description:
    "Stardate: Unknown. Seven of Nine obsessively investigate pursues a conspiracy theory about Voyager’s arrival in the Delta Quadrant.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-6"],
  position: 9,
  publishedAt: "1999-11-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113312",
      externalLink: "https://www.themoviedb.org/tv/1855/season/6/episode/9",
    },
  ],
  title: "The Voyager Conspiracy",
  episodeType: "standard",
  stillPath: "/8jkjGF225qhWSTo7xZR4OjykPJK.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
