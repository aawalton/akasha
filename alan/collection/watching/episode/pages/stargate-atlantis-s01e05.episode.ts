import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS01e05 = {
  id: "01a18854-82cf-7369-aa57-98db7b0f346d",
  type: "page-type/episode",
  slug: "stargate-atlantis-s01e05",
  description:
    "After a series of run-ins with the Wraith, the team begins to suspect their Athosian allies of having a spy in their midst.",
  ownLength: 48,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-1"],
  position: 5,
  publishedAt: "2004-08-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168443",
      externalLink: "https://www.themoviedb.org/tv/2290/season/1/episode/5",
    },
  ],
  title: "Suspicion",
  episodeType: "standard",
  stillPath: "/Tk1i1WPjseecFFFqF1OLXXWDgg.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
