import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const manifestS04e20 = {
  id: "01a1884a-400d-7cc6-9332-02acb61af2e7",
  type: "page-type/episode",
  slug: "manifest-s04e20",
  description:
    "The Death Date has arrived. As tensions erupt and revelations emerge, the passengers of Flight 828 reunite and face the unknown together.",
  ownLength: 62,
  ownProgress: 0,
  partOfCollections: ["season/manifest-season-4"],
  position: 20,
  publishedAt: "2023-06-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4350239",
      externalLink: "https://www.themoviedb.org/tv/79696/season/4/episode/20",
    },
  ],
  title: "Final Boarding",
  episodeType: "finale",
  stillPath: "/bqi0LHlmJPOWAdVedTWKM9CYZM1.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:32:09.865Z",
  updatedAt: "2026-10-29T15:32:09.865Z",
} as const satisfies Episode
