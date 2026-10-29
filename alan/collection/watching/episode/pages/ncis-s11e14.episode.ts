import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS11e14 = {
  id: "01a1884b-ef71-7837-a9c9-ba6e5b37a2c9",
  type: "page-type/episode",
  slug: "ncis-s11e14",
  description:
    "A port authority officer's murder reveals a possible location for Parsa, while Bishop reveals a past connection to the terrorist.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-11"],
  position: 14,
  publishedAt: "2014-02-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "971312",
      externalLink: "https://www.themoviedb.org/tv/4614/season/11/episode/14",
    },
  ],
  title: "Monsters and Men",
  episodeType: "standard",
  stillPath: "/mo2vxWekJw6D4WfJbdODGUYEL1D.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
