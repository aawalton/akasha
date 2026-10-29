import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisSydneyS01e01 = {
  id: "01a1884b-6700-72d9-885a-b521112614ca",
  type: "page-type/episode",
  slug: "ncis-sydney-s01e01",
  description:
    "The death of an American seaman on a U.S. nuclear submarine during an AUKUS ceremony on Sydney Harbour is investigated in a joint effort between America's NCIS agents afloat and the Australian Federal Police.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-sydney-season-1"],
  position: 1,
  publishedAt: "2023-11-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4706957",
      externalLink: "https://www.themoviedb.org/tv/157950/season/1/episode/1",
    },
  ],
  title: "Gone Fission",
  episodeType: "standard",
  stillPath: "/wAa07lZ9HKAswaEtTuRXvX4RPaQ.jpg",
  voteAverage: 5.5,
  createdAt: "2026-10-29T15:33:25.376Z",
  updatedAt: "2026-10-29T15:33:25.376Z",
} as const satisfies Episode
