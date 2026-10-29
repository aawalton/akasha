import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS01e12 = {
  id: "01a18855-67e4-783e-9bc4-0f9c99a17424",
  type: "page-type/episode",
  slug: "steven-universe-s01e12",
  description:
    'Steven urges Amethyst and Pearl to fuse together into a four-armed "giant woman" named Opal (Aimee Mann). Amethyst and Pearl, however, keep on quarrelling.',
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-1"],
  position: 12,
  publishedAt: "2014-02-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1003605",
      externalLink: "https://www.themoviedb.org/tv/61175/season/1/episode/12",
    },
  ],
  title: "Giant Woman",
  episodeType: "standard",
  stillPath: "/hEsbDvNLgRX5tP5NWAD5eGuAWGv.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
