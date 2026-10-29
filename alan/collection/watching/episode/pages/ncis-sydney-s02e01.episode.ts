import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisSydneyS02e01 = {
  id: "01a1884b-6701-7dcf-9ebb-6c56051171ed",
  type: "page-type/episode",
  slug: "ncis-sydney-s02e01",
  description:
    "NCIS: Sydney will do whatever it takes to crack the case of a rogue assassin on the run during NCIS Special Agent DeShawn Jackson's chaotic first day as boss.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-sydney-season-2"],
  position: 1,
  publishedAt: "2025-02-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5755891",
      externalLink: "https://www.themoviedb.org/tv/157950/season/2/episode/1",
    },
  ],
  title: "Heart Starter",
  episodeType: "standard",
  stillPath: "/6xFSGw5VHXFrso38Y6MmMaCJbrk.jpg",
  voteAverage: 3.2,
  createdAt: "2026-10-29T15:33:25.376Z",
  updatedAt: "2026-10-29T15:33:25.376Z",
} as const satisfies Episode
