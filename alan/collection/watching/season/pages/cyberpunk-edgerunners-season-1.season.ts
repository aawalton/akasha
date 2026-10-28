import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const cyberpunkEdgerunnersSeason1 = {
  id: "01a183da-5751-7645-9999-8b857bd624e3",
  type: "page-type/season",
  slug: "cyberpunk-edgerunners-season-1",
  description:
    "In a dystopia riddled with corruption and cybernetic implants, a talented but reckless street kid strives to become a mercenary outlaw — an edgerunner.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/cyberpunk-edgerunners"],
  position: 1,
  publishedAt: "2022-09-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "154580",
      externalLink: "https://www.themoviedb.org/tv/105248/season/1",
    },
  ],
  title: "Cyberpunk: Edgerunners",
  posterPath: "/6MMjX9T0L7eoRfZFTnzC6WXYZLK.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-28T18:51:26.927Z",
  updatedAt: "2026-10-28T18:51:26.927Z",
} as const satisfies Season
