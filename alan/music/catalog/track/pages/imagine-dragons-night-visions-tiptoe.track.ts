import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsNightVisionsTiptoe = {
  id: "01a0c43f-d480-7e0a-a58f-bce75df2c149",
  type: "page-type/track",
  slug: "imagine-dragons-night-visions-tiptoe",
  ownLength: 3.216666666666667,
  ownProgress: 3.216666666666667,
  partOfCollections: ["release/imagine-dragons-night-visions"],
  position: 2,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3dw0A0cbqT6Oy2V8KfGwIT",
      externalLink: "https://open.spotify.com/track/3dw0A0cbqT6Oy2V8KfGwIT",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Tiptoe",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "tiptoe|53XhwfbYqKCa1cC15pYq2q|193000",
  song: "song/imagine-dragons-tiptoe",
  carriedBy: [
    {
      release: "release/imagine-dragons-night-visions",
      discNumber: 1,
      position: 2,
      externalId: "3dw0A0cbqT6Oy2V8KfGwIT",
      externalLink: "https://open.spotify.com/track/3dw0A0cbqT6Oy2V8KfGwIT",
    },
  ],
} as const satisfies Track
