import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrande7RingsRemix = {
  id: "01a0676a-d715-7015-b00c-9dbae9c8f092",
  type: "page-type/release",
  slug: "ariana-grande-7-rings-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2019-02-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6FK2NjcZxGIGmFjKfOkrNi",
      externalLink: "https://open.spotify.com/album/6FK2NjcZxGIGmFjKfOkrNi",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "7 rings (Remix)",
} as const satisfies Release
