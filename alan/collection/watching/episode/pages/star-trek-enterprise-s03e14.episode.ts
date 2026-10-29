import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS03e14 = {
  id: "01a18852-d432-7ee4-856a-230506b2b6d7",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s03e14",
  description:
    "Archer finds himself face-to-face with Degra, the designer of the Xindi superweapon, and tries to get him to reveal its location.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-3"],
  position: 14,
  publishedAt: "2004-02-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15610",
      externalLink: "https://www.themoviedb.org/tv/314/season/3/episode/14",
    },
  ],
  title: "Stratagem",
  episodeType: "standard",
  stillPath: "/cHTep9AcCPPgfXgEuRgJVyhVgPQ.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
