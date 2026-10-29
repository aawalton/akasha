import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gravityFallsS02e10 = {
  id: "01a18849-545f-71ab-b4a6-1d92be24e1f6",
  type: "page-type/episode",
  slug: "gravity-falls-s02e10",
  description:
    "Pacifica enlists Dipper’s help to rid the Northwest Mansion of a ghost before he wreaks havoc on her fancy party.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gravity-falls-season-2"],
  position: 10,
  publishedAt: "2015-02-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1039058",
      externalLink: "https://www.themoviedb.org/tv/40075/season/2/episode/10",
    },
  ],
  title: "Northwest Mansion Noir",
  episodeType: "standard",
  stillPath: "/AmVE3qPoTp7UG1OFL02Exv4nuwP.jpg",
  voteAverage: 8.9,
  createdAt: "2026-10-29T15:31:09.532Z",
  updatedAt: "2026-10-29T15:31:09.532Z",
} as const satisfies Episode
