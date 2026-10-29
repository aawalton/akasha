import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS04e08 = {
  id: "01a18854-82d3-7a4f-a779-05e6f57ae788",
  type: "page-type/episode",
  slug: "stargate-atlantis-s04e08",
  description:
    "The team meets a man with extraordinary prophetic abilities, who gives them a dark prediction about Atlantis's future. The Wraith seek a new alliance with Atlantis in their war with the Replicators.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-4"],
  position: 8,
  publishedAt: "2007-11-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168530",
      externalLink: "https://www.themoviedb.org/tv/2290/season/4/episode/8",
    },
  ],
  title: "The Seer",
  episodeType: "standard",
  stillPath: "/3wfhGwUfVmiWRIS8cBCviQpFdun.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
