import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrande7RingsRemix = {
  id: "01a0676a-d715-7015-b00c-9dbae9c8f092",
  type: "release",
  slug: "ariana-grande-7-rings-remix",
  title: "7 rings (Remix)",
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  ownLength: 2.977333,
  ownProgress: 2.977333,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-02-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6FK2NjcZxGIGmFjKfOkrNi",
      externalLink: "https://open.spotify.com/album/6FK2NjcZxGIGmFjKfOkrNi",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Release
