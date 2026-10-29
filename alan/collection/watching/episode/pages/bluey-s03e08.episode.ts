import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS03e08 = {
  id: "01a18843-d153-73af-9074-775e2f1d02b7",
  type: "page-type/episode",
  slug: "bluey-s03e08",
  description:
    "Bluey can't get to sleep, so Mum reads her one last story. But they are interrupted by Unicorse, the most annoying hand puppet in the world, whom Bluey tries to reform.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-3"],
  position: 8,
  publishedAt: "2021-11-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3350930",
      externalLink: "https://www.themoviedb.org/tv/82728/season/3/episode/8",
    },
  ],
  title: "Unicorse",
  episodeType: "standard",
  stillPath: "/uiBaZCL1NTDn1hKKUiiBPvb4Fri.jpg",
  voteAverage: 5.4,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
