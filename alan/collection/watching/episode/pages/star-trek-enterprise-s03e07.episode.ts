import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS03e07 = {
  id: "01a18852-d432-7376-8784-4991804e6d8e",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s03e07",
  description:
    "Archer, Reed and Major Hayes infiltrate a Xindi-Sloth industrial colony to learn more about the weapon of mass destruction that will be used against Earth.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-3"],
  position: 7,
  publishedAt: "2003-10-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15602",
      externalLink: "https://www.themoviedb.org/tv/314/season/3/episode/7",
    },
  ],
  title: "The Shipment",
  episodeType: "standard",
  stillPath: "/u2r72yZNzVA3strcSCBRMoRSfnQ.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
