import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeRainOnMeRalphiRosarioRemix = {
  id: "01a0676a-d727-7046-9fce-0473e12e86b6",
  type: "page-type/release",
  slug: "ariana-grande-rain-on-me-ralphi-rosario-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2020-07-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7vAZjssOcIuksA5DxN5sM1",
      externalLink: "https://open.spotify.com/album/7vAZjssOcIuksA5DxN5sM1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Rain On Me (Ralphi Rosario Remix)",
} as const satisfies Release
