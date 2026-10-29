import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS02e23 = {
  id: "01a1884a-e0ea-714d-a18e-e0ca3fcebb9d",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s02e23",
  description:
    "A Navy SEAL imposter's death gives the team a lead on a missing canister used to make deadly bombs.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-2"],
  position: 23,
  publishedAt: "2011-05-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557320",
      externalLink: "https://www.themoviedb.org/tv/17610/season/2/episode/23",
    },
  ],
  title: "Imposters",
  episodeType: "standard",
  stillPath: "/6cKghLSfsMrv9aHE0A12Ds2xi3d.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
