import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS12e14 = {
  id: "01a1884b-ef72-7a35-9b21-36e4203af04e",
  type: "page-type/episode",
  slug: "ncis-s12e14",
  description:
    "DiNozzo returns to the military academy he attended as a teen after a murdered Marine, who was an alumnus of the school, is found clutching the photo of a current student.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-12"],
  position: 14,
  publishedAt: "2015-02-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1040213",
      externalLink: "https://www.themoviedb.org/tv/4614/season/12/episode/14",
    },
  ],
  title: "Cadence",
  episodeType: "standard",
  stillPath: "/boQF1pBoZquJEvkHcYqfd4CnqIc.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
