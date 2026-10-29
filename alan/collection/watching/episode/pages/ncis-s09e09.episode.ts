import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS09e09 = {
  id: "01a1884b-ef6e-7889-9dd2-f9828f537dd8",
  type: "page-type/episode",
  slug: "ncis-s09e09",
  description:
    "As the NCIS team continues its search for a missing Marine, Gibbs and Ziva travel to her last known whereabouts in Afghanistan.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-9"],
  position: 9,
  publishedAt: "2011-11-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334601",
      externalLink: "https://www.themoviedb.org/tv/4614/season/9/episode/9",
    },
  ],
  title: "Engaged (2)",
  episodeType: "standard",
  stillPath: "/gmgRidyEchxUjOmspZqxSa12NFa.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
