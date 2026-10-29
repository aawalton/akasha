import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS01e24 = {
  id: "01a18884-b706-7ecd-9595-955d5bcc82e0",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s01e24",
  description:
    "Stardate: 41775.5. The strange behavior of high-ranking officers leads Picard to uncover a twisted alien conspiracy within Starfleet.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-1"],
  position: 24,
  publishedAt: "1988-05-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37083",
      externalLink: "https://www.themoviedb.org/tv/655/season/1/episode/24",
    },
  ],
  title: "Conspiracy",
  episodeType: "standard",
  stillPath: "/gSN6vCu6MfcLvGyAsn62GqM7St4.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
