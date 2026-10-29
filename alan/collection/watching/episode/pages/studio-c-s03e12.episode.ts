import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS03e12 = {
  id: "01a18885-00fa-756c-a8a9-2e5447d351f2",
  type: "page-type/episode",
  slug: "studio-c-s03e12",
  description:
    "Tune in to watch the Studio C cast give fun remarks on the Top 10 sketches from Season 2.",
  ownLength: 53,
  ownProgress: 53,
  partOfCollections: ["season/studio-c-season-3"],
  position: 12,
  publishedAt: "2013-11-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5580171",
      externalLink: "https://www.themoviedb.org/tv/68207/season/3/episode/12",
    },
  ],
  title: "Season 2 Favorites",
  episodeType: "standard",
  stillPath: "/vos7xkEGpPqGWo43fy62q8mGIPv.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
