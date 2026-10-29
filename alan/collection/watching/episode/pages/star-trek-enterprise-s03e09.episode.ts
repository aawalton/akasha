import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS03e09 = {
  id: "01a18852-d432-7079-a6e0-d946861c3d69",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s03e09",
  description:
    "When a settlement of humans living a 19th-century Western lifestyle is discovered on a Delphic Expanse planet, Archer and crew set out to learn how they got there.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-3"],
  position: 9,
  publishedAt: "2003-11-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15603",
      externalLink: "https://www.themoviedb.org/tv/314/season/3/episode/9",
    },
  ],
  title: "North Star",
  episodeType: "standard",
  stillPath: "/jhyLKUnDVmr5X0B8Y5Xjj0WWbnp.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
