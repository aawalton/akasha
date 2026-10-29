import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS02e12 = {
  id: "01a18852-d431-742d-ad3d-88bd3fa1d12c",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s02e12",
  description:
    "When a lethal neutronic storm approaches faster than Enterprise can escape, the crew take shelter in the maintenance shafts inside the warp nacelles. They also provide refuge to a group of aliens, who aren't exactly honest about themselves.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-2"],
  position: 12,
  publishedAt: "2002-12-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15569",
      externalLink: "https://www.themoviedb.org/tv/314/season/2/episode/12",
    },
  ],
  title: "The Catwalk",
  episodeType: "standard",
  stillPath: "/NQuE0n9OlemZ1fBAufg72on45z.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
