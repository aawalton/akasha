import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2SoloHomeAndTheHeartland = {
  id: "01a0abea-6a3e-7598-a32d-317ca1872a23",
  type: "page-type/track",
  slug: "celtic-woman-2-solo-home-and-the-heartland",
  ownLength: 3.3473333333333333,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-solo"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7BEHPIeAh2iuQqkOh3H2If",
      externalLink: "https://open.spotify.com/track/7BEHPIeAh2iuQqkOh3H2If",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Home and the Heartland",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4VdV1ro3dBSsu1cRGwbFD3", artistName: "Lisa Kelly" }],
  trackKey: "homeandtheheartland|4VdV1ro3dBSsu1cRGwbFD3|200840",
  song: "song/celtic-woman-home-and-the-heartland",
} as const satisfies Track
