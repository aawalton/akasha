import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS02e14 = {
  id: "01a18884-b707-7b26-ac74-c59ecc541bb6",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s02e14",
  description:
    "Stardate: 42686.4. Riker is promoted to Captain of another Federation ship. Worf must confront his past and his Klingon heritage.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-2"],
  position: 14,
  publishedAt: "1989-04-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37098",
      externalLink: "https://www.themoviedb.org/tv/655/season/2/episode/14",
    },
  ],
  title: "The Icarus Factor",
  episodeType: "standard",
  stillPath: "/ffTMcPms5gqGM3UiFgErQodTCCC.jpg",
  voteAverage: 5.9,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
