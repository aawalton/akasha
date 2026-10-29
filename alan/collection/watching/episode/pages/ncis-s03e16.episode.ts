import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS03e16 = {
  id: "01a1884b-ef65-7bbe-b7e4-84ac9b1341b1",
  type: "page-type/episode",
  slug: "ncis-s03e16",
  description:
    "When an ambulance explodes while carrying the remains of a Marine's body that was killed in a car crash, the NCIS team are called in to investigate what actually happened. The investigation leads them to some sudden discoveries - the DNA of the victim found in the ambulance doesn't match the Marine's DNA, the ambulance was set up to explode, and the family of the dead Marine is hiding a very important secret.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-3"],
  position: 16,
  publishedAt: "2006-02-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334532",
      externalLink: "https://www.themoviedb.org/tv/4614/season/3/episode/16",
    },
  ],
  title: "Family Secret",
  episodeType: "standard",
  stillPath: "/vr0oD7OqDSaInR7wt6idXobf876.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
