import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackMirrorS04e01 = {
  id: "01a18843-982b-7310-ba4f-3b9d00edadaf",
  type: "page-type/episode",
  slug: "black-mirror-s04e01",
  description:
    "Capt. Robert Daly presides over his crew with wisdom and courage. But a new recruit will soon discover nothing on this spaceship is what it seems.",
  ownLength: 76,
  ownProgress: 0,
  partOfCollections: ["season/black-mirror-season-4"],
  position: 1,
  publishedAt: "2017-12-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1402684",
      externalLink: "https://www.themoviedb.org/tv/42009/season/4/episode/1",
    },
  ],
  title: "USS Callister",
  episodeType: "standard",
  stillPath: "/dagpqvCO48XDFCUe7I2SYCuXCA1.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:24:53.673Z",
  updatedAt: "2026-10-29T15:24:53.673Z",
} as const satisfies Episode
