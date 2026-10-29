import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theSarahJaneAdventuresS04e11 = {
  id: "01a18858-1d5e-7587-81ec-a32e859d09e3",
  type: "page-type/episode",
  slug: "the-sarah-jane-adventures-s04e11",
  description: "No one can defend the earth forever, but who could ever replace Sarah Jane?",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/the-sarah-jane-adventures-season-4"],
  position: 11,
  publishedAt: "2010-11-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "12025",
      externalLink: "https://www.themoviedb.org/tv/203/season/4/episode/11",
    },
  ],
  title: "Goodbye, Sarah Jane Smith (1)",
  episodeType: "standard",
  stillPath: "/qdtgpsXqom3szkLvuqK8kRmsONj.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T15:47:18.491Z",
  updatedAt: "2026-10-29T15:47:18.491Z",
} as const satisfies Episode
