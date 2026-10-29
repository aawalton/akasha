import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackMirrorS04e06 = {
  id: "01a18843-982b-7364-9c11-ae24a10ee98c",
  type: "page-type/episode",
  slug: "black-mirror-s04e06",
  description:
    "On a dusty stretch of highway, a traveler stumbles across a museum that boasts rare criminal artifacts -- and a disturbing main attraction.",
  ownLength: 69,
  ownProgress: 0,
  partOfCollections: ["season/black-mirror-season-4"],
  position: 6,
  publishedAt: "2017-12-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1402689",
      externalLink: "https://www.themoviedb.org/tv/42009/season/4/episode/6",
    },
  ],
  title: "Black Museum",
  episodeType: "finale",
  stillPath: "/fOKwBPMBSm1B6zc3wkN4hCkbtsf.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:24:53.673Z",
  updatedAt: "2026-10-29T15:24:53.673Z",
} as const satisfies Episode
