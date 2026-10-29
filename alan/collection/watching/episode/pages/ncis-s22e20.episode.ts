import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS22e20 = {
  id: "01a1884b-ef85-7d0e-bc06-0f608d63064f",
  type: "page-type/episode",
  slug: "ncis-s22e20",
  description:
    "As NCIS investigates a dangerous connection between the Nexus cartel and Parker's longtime nemesis, mob boss Carla Marino, the team uncovers a high-stakes plot involving stolen nuclear material.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-22"],
  position: 20,
  publishedAt: "2025-05-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6063449",
      externalLink: "https://www.themoviedb.org/tv/4614/season/22/episode/20",
    },
  ],
  title: "Nexus",
  episodeType: "finale",
  stillPath: "/gVibhEdIR3hpAfrkQcW17RY1nhV.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
