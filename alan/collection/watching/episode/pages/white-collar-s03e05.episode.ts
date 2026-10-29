import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whiteCollarS03e05 = {
  id: "01a18881-51a1-7f29-8162-df3dedd81440",
  type: "page-type/episode",
  slug: "white-collar-s03e05",
  description: "Peter and Neal pose as wealthy bachelors to catch a black widow.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/white-collar-season-3"],
  position: 5,
  publishedAt: "2011-07-05",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "596280",
      externalLink: "https://www.themoviedb.org/tv/21510/season/3/episode/5",
    },
  ],
  title: "Veiled Threat",
  episodeType: "standard",
  stillPath: "/7eKmt3J074czOgKUi7iTWk6NSiN.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T16:32:18.847Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Episode
