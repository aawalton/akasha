import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsSmokeMirrorsPolaroid = {
  id: "01a0c43f-d302-7a23-ae58-c7ed12665100",
  type: "page-type/track",
  slug: "imagine-dragons-smoke-mirrors-polaroid",
  ownLength: 3.83355,
  ownProgress: 0,
  partOfCollections: ["release/imagine-dragons-smoke-mirrors"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7fvgzmfXxrdTcrL3xh2cBD",
      externalLink: "https://open.spotify.com/track/7fvgzmfXxrdTcrL3xh2cBD",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Polaroid",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "polaroid|53XhwfbYqKCa1cC15pYq2q|230013",
  song: "song/imagine-dragons-polaroid",
} as const satisfies Track
