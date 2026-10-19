import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixAtHome2Dreams = {
  id: "01a1546f-24f4-7aad-a82a-47e6a0f2304d",
  type: "page-type/track",
  slug: "pentatonix-at-home-2-dreams",
  ownLength: 2.96605,
  ownProgress: 2.96605,
  partOfCollections: ["release/pentatonix-at-home-2", "release/pentatonix-at-home"],
  status: "completed",
  unit: "unit/minutes",
  title: "Dreams",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "dreams|26AHtbjWKiwYzsoGoUZq53|177963",
  song: "song/pentatonix-dreams",
  carriedBy: [
    {
      release: "release/pentatonix-at-home",
      discNumber: 1,
      position: 6,
      externalId: "5ZXGpzCzBc931t9ze9DmCv",
      externalLink: "https://open.spotify.com/track/5ZXGpzCzBc931t9ze9DmCv",
    },
    {
      release: "release/pentatonix-at-home-2",
      discNumber: 1,
      position: 6,
      externalId: "6KDuMVPOs3eZOZFLskgaVR",
      externalLink: "https://open.spotify.com/track/6KDuMVPOs3eZOZFLskgaVR",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T14:01:21.162Z",
  progressedAt: "2026-10-19T14:01:21.162Z",
} as const satisfies Track
