import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS04e04 = {
  id: "01a18852-d433-7aec-b348-8d3e6201d813",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s04e04",
  description:
    "When genetic supermen left over from the Eugenics Wars hijack a Klingon ship, Archer must rely on their creator, the criminal Dr. Arik Soong, to help hunt them down.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-4"],
  position: 4,
  publishedAt: "2004-10-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15632",
      externalLink: "https://www.themoviedb.org/tv/314/season/4/episode/4",
    },
  ],
  title: "Borderland (1)",
  episodeType: "standard",
  stillPath: "/e66oZWwpGwPoecTfTdp4oS0w9M2.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
