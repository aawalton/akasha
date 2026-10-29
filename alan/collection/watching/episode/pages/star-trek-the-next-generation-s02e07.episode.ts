import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS02e07 = {
  id: "01a18884-b706-7623-b487-abf98cef9e9e",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s02e07",
  description:
    "Stardate: 42494.8. A mysterious hyper-ageing sickness kills the crew of a Federation cargo ship, and Dr. Pulaski must race against time to find a cure.",
  ownLength: 45,
  ownProgress: 45,
  partOfCollections: ["season/star-trek-the-next-generation-season-2"],
  position: 7,
  publishedAt: "1989-01-30",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37091",
      externalLink: "https://www.themoviedb.org/tv/655/season/2/episode/7",
    },
  ],
  title: "Unnatural Selection",
  episodeType: "standard",
  stillPath: "/WBVNHTqOzCtImarNMXpgcavNgJ.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
