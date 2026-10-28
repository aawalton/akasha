import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bleachS01e12 = {
  id: "01a183d3-f46e-775e-b7df-861abdbc059d",
  type: "page-type/episode",
  slug: "bleach-s01e12",
  description:
    "As Ichigo Kurosaki begins his duel with Uryū Ishida, Yasutora Sado gains a new power.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/bleach-season-1"],
  position: 12,
  publishedAt: "2004-12-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "750582",
      externalLink: "https://www.themoviedb.org/tv/30984/season/1/episode/12",
    },
  ],
  title: "A Gentle Right Arm",
  episodeType: "standard",
  stillPath: "/vBByvDRB8N5bJX8kEp1GtupHknY.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:44:28.395Z",
  updatedAt: "2026-10-28T18:44:28.395Z",
} as const satisfies Episode
