import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackMirrorS02e04 = {
  id: "01a18843-982a-7e57-bba3-938d4538926a",
  type: "page-type/episode",
  slug: "black-mirror-s02e04",
  description:
    "In a mysterious and remote snowy outpost, Matt and Potter share a Christmas meal together, swapping creepy tales of their earlier lives in the outside world.",
  ownLength: 74,
  ownProgress: 0,
  partOfCollections: ["season/black-mirror-season-2"],
  position: 4,
  publishedAt: "2014-12-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7014792",
      externalLink: "https://www.themoviedb.org/tv/42009/season/2/episode/4",
    },
  ],
  title: "White Christmas",
  episodeType: "finale",
  stillPath: "/jfNRmAE5tY5kqg3s1HOPocs30G1.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T15:24:53.673Z",
  updatedAt: "2026-10-29T15:24:53.673Z",
} as const satisfies Episode
