import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS02e14 = {
  id: "01a183d4-acc3-78b3-a6ea-e89e2fd11870",
  type: "page-type/episode",
  slug: "my-hero-academia-s02e14",
  description:
    "The internships begin! While everyone adjusts to their new tasks, Izuku starts training with Gran Torino, the same man who once taught All Might.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-2"],
  position: 14,
  publishedAt: "2017-07-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1336080",
      externalLink: "https://www.themoviedb.org/tv/65930/season/2/episode/14",
    },
  ],
  title: "Bizarre! Gran Torino Appears",
  episodeType: "standard",
  stillPath: "/wli0QbsPQXM5rqGEjm2otWAMKhR.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
