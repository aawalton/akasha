import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS04e16 = {
  id: "01a18852-d434-7619-99b9-177a5c9126ad",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s04e16",
  description:
    "With Columbia's help, the Enterprise crew grapples with sabotage to their ship as they pursue the truth behind the kidnapping of Phlox.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-4"],
  position: 16,
  publishedAt: "2005-02-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15626",
      externalLink: "https://www.themoviedb.org/tv/314/season/4/episode/16",
    },
  ],
  title: "Divergence (2)",
  episodeType: "standard",
  stillPath: "/cqhFGDsggsMNxH9gAKjBudiyHFB.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
