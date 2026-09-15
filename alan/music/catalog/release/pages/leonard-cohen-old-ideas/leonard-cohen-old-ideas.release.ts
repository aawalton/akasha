import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const leonardCohenOldIdeas = {
  id: "01a0676a-d726-701e-bdfb-88e7241d908b",
  type: "release",
  slug: "leonard-cohen-old-ideas",
  title: "Old Ideas",
  partOfCollections: ["artist/leonard-cohen"],
  position: 0,
  ownLength: 41.4315,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2012-03-28",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0waLDJlCfXkXIwFGdBZ6UK",
      externalLink: "https://open.spotify.com/album/0waLDJlCfXkXIwFGdBZ6UK",
      lastSyncedAt: "2025-10-10",
    },
  ],
} as const satisfies Release
