import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS05e25 = {
  id: "01a18857-c36a-77b1-8e4a-c2cc386b60fd",
  type: "page-type/episode",
  slug: "the-office-s05e25",
  description:
    "Michael decides to open a cafe-disco in his old office. Pam and Jim are planning a secret trip.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-5"],
  position: 25,
  publishedAt: "2009-05-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170225",
      externalLink: "https://www.themoviedb.org/tv/2316/season/5/episode/25",
    },
  ],
  title: "Cafe Disco",
  episodeType: "standard",
  stillPath: "/bx0J1oSJNxtMVuYfdAUGfWzH1zk.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
