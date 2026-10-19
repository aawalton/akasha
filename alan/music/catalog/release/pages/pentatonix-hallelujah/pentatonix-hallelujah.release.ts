import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixHallelujah = {
  id: "01a0676a-d71f-703a-9739-02208bc67f89",
  type: "page-type/release",
  slug: "pentatonix-hallelujah",
  title: "Hallelujah",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-01-06",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1zwXAdIuszeLhNEhCEGC4y",
      externalLink: "https://open.spotify.com/album/1zwXAdIuszeLhNEhCEGC4y",
    },
  ],
  createdAt: "2026-09-03T13:17:30.271Z",
  updatedAt: "2026-10-19T14:01:29.522Z",
  progressedAt: "2026-10-19T14:01:29.522Z",
} as const satisfies Release
