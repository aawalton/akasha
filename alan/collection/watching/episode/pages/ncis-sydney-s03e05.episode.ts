import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisSydneyS03e05 = {
  id: "01a1884b-6701-7b74-b453-a87de2517edf",
  type: "page-type/episode",
  slug: "ncis-sydney-s03e05",
  description:
    "When a U.S. Navy attaché is found dead with a USB lodged in his throat, the team tracks a killer believed to have ties to an international chess tournament in Sydney.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-sydney-season-3"],
  position: 5,
  publishedAt: "2025-11-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6454681",
      externalLink: "https://www.themoviedb.org/tv/157950/season/3/episode/5",
    },
  ],
  title: "Black Is White",
  episodeType: "standard",
  stillPath: "/b0d8ISrijYLoCVTvvbZbemIrWYe.jpg",
  voteAverage: 5.5,
  createdAt: "2026-10-29T15:33:25.376Z",
  updatedAt: "2026-10-29T15:33:25.376Z",
} as const satisfies Episode
