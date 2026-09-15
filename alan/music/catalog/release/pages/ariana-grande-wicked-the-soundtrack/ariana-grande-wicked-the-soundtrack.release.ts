import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeWickedTheSoundtrack = {
  id: "01a0676a-d731-7019-a6f1-b595fa8757d8",
  type: "page-type/release",
  slug: "ariana-grande-wicked-the-soundtrack",
  title: "Wicked: The Soundtrack",
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  ownLength: 62.7328,
  ownProgress: 62.7328,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2024-11-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1gLo9HojTvd3vN5rqPvk0I",
      externalLink: "https://open.spotify.com/album/1gLo9HojTvd3vN5rqPvk0I",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Release
