import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS06e21 = {
  id: "01a18885-00fc-7cfd-a48d-df5b5b9f6330",
  type: "page-type/episode",
  slug: "studio-c-s06e21",
  description:
    "Gather everyone together to watch as the cast of Studio C show their favorite off-set sketches and talk about what went into filming them.",
  ownLength: 23,
  ownProgress: 23,
  partOfCollections: ["season/studio-c-season-6"],
  position: 21,
  publishedAt: "2015-04-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5528861",
      externalLink: "https://www.themoviedb.org/tv/68207/season/6/episode/21",
    },
  ],
  title: "Off-Set",
  episodeType: "standard",
  stillPath: "/czOIQ4LHQtNPTB2oBIjmvJJgKtD.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
