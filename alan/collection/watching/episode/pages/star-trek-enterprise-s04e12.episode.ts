import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS04e12 = {
  id: "01a18852-d434-7c57-a465-8a8f7a8d7ba7",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s04e12",
  description:
    "Enterprise journeys to Babel with a Tellarite ambassador on board for peace talks with the Andorians, when a distress call from Shran is received.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-4"],
  position: 12,
  publishedAt: "2005-01-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15628",
      externalLink: "https://www.themoviedb.org/tv/314/season/4/episode/12",
    },
  ],
  title: "Babel One (1)",
  episodeType: "standard",
  stillPath: "/kWCMDMm2F7Iy6mshVoWcn1nclC0.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
