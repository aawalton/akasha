import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const rwby2S01e11 = {
  id: "01a18884-8768-71dd-b610-c3dc41747537",
  type: "page-type/episode",
  slug: "rwby-2-s01e11",
  description:
    "Jaune struggles with combat lessons while Cardin makes a name for himself as a bully.",
  ownLength: 5,
  ownProgress: 5,
  partOfCollections: ["season/rwby-volume-1"],
  position: 11,
  publishedAt: "2013-09-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "918561",
      externalLink: "https://www.themoviedb.org/tv/50137/season/1/episode/11",
    },
  ],
  title: "Jaunedice (1)",
  episodeType: "standard",
  stillPath: "/3927zAOEefpem11p79J7OdJYwNb.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T16:35:49.223Z",
  updatedAt: "2026-10-29T16:35:49.223Z",
} as const satisfies Episode
