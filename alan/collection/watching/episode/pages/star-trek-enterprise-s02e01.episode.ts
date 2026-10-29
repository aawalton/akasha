import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS02e01 = {
  id: "01a18852-d430-788e-aa5c-7519c52a2b21",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s02e01",
  description:
    "Daniels and Archer must find a way back to the 22nd century in order to make sure history plays out as it should. Meanwhile, on board Enterprise, the Suliban have taken over the ship, but Reed, Trip, and T'Pol formulate a plan to eject the aliens.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-2"],
  position: 1,
  publishedAt: "2002-09-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15566",
      externalLink: "https://www.themoviedb.org/tv/314/season/2/episode/1",
    },
  ],
  title: "Shockwave (2)",
  episodeType: "standard",
  stillPath: "/w1GhsWpmapx9EjNfkycOyuzL0OU.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
