import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixPtxOnMyWayHome = {
  id: "01a1546f-24fc-7e52-b381-e6145c39271a",
  type: "page-type/track",
  slug: "pentatonix-ptx-on-my-way-home",
  ownLength: 3.2571,
  ownProgress: 3.2571,
  partOfCollections: ["release/pentatonix-ptx"],
  status: "completed",
  unit: "unit/minutes",
  title: "On My Way Home",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "onmywayhome|26AHtbjWKiwYzsoGoUZq53|195426",
  song: "song/pentatonix-on-my-way-home",
  carriedBy: [
    {
      release: "release/pentatonix-ptx",
      discNumber: 1,
      position: 3,
      externalId: "4EHN86Rr3oF4uB1DYsr2q7",
      externalLink: "https://open.spotify.com/track/4EHN86Rr3oF4uB1DYsr2q7",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T14:01:21.162Z",
  progressedAt: "2026-10-19T14:01:21.162Z",
} as const satisfies Track
