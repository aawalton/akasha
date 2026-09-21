import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsWreckedWrecked = {
  id: "01a0c43f-db14-74c7-9ba2-c81b7b72f52b",
  type: "page-type/track",
  slug: "imagine-dragons-wrecked-wrecked",
  ownLength: 4.0667333333333335,
  ownProgress: 4.0667333333333335,
  partOfCollections: ["release/imagine-dragons-wrecked"],
  position: 1,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2d1MywHy6FwKdzxFuSJnwl",
      externalLink: "https://open.spotify.com/track/2d1MywHy6FwKdzxFuSJnwl",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Wrecked",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "wrecked|53XhwfbYqKCa1cC15pYq2q|244004",
  song: "song/imagine-dragons-wrecked",
  carriedBy: [
    {
      release: "release/imagine-dragons-wrecked",
      discNumber: 1,
      position: 1,
      externalId: "2d1MywHy6FwKdzxFuSJnwl",
      externalLink: "https://open.spotify.com/track/2d1MywHy6FwKdzxFuSJnwl",
    },
  ],
} as const satisfies Track
