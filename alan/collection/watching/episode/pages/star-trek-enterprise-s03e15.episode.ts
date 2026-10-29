import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS03e15 = {
  id: "01a18852-d432-70ab-8ce0-3b44b7b4697b",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s03e15",
  description:
    "As Archer tries to unravel the mystery of a rescued alien, long-simmering feelings explode among his senior officers.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-3"],
  position: 15,
  publishedAt: "2004-02-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15596",
      externalLink: "https://www.themoviedb.org/tv/314/season/3/episode/15",
    },
  ],
  title: "Harbinger",
  episodeType: "standard",
  stillPath: "/nQE9Hvp4Pbs8hQTCC0fpLdEyq4r.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
