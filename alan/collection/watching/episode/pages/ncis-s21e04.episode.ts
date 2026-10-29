import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS21e04 = {
  id: "01a1884b-ef83-728d-a448-6e8c8e44e4e6",
  type: "page-type/episode",
  slug: "ncis-s21e04",
  description:
    "The NCIS team is in a race against time to find a missing officer who disappeared during his wedding proposal.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-21"],
  position: 4,
  publishedAt: "2024-03-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5150542",
      externalLink: "https://www.themoviedb.org/tv/4614/season/21/episode/4",
    },
  ],
  title: "Left Unsaid",
  episodeType: "standard",
  stillPath: "/xUxjzKoDWGsot6EC9FahSVPFL7h.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
