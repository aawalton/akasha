import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS04e03 = {
  id: "01a18854-82d2-7eb0-ad4a-78a77d96c111",
  type: "page-type/episode",
  slug: "stargate-atlantis-s04e03",
  description:
    "When a group of Ronon's people enlist the team's help in raiding a Wraith weapons facility, Ronon reconsiders whether his future lies in Atlantis or with his friends.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-4"],
  position: 3,
  publishedAt: "2007-10-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168523",
      externalLink: "https://www.themoviedb.org/tv/2290/season/4/episode/3",
    },
  ],
  title: "Reunion",
  episodeType: "standard",
  stillPath: "/j5d0AkMPSyvO0lzk1eLCRwK2MxB.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
