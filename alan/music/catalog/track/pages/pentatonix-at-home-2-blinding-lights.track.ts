import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixAtHome2BlindingLights = {
  id: "01a1546f-24f3-7471-8d34-dbc6e7dcf3bb",
  type: "page-type/track",
  slug: "pentatonix-at-home-2-blinding-lights",
  ownLength: 3.0338166666666666,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-at-home-2", "release/pentatonix-at-home"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Blinding Lights",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "blindinglights|26AHtbjWKiwYzsoGoUZq53|182029",
  song: "song/pentatonix-blinding-lights",
  carriedBy: [
    {
      release: "release/pentatonix-at-home",
      discNumber: 1,
      position: 2,
      externalId: "42XfiOCf9wEL8RSSK1SeBz",
      externalLink: "https://open.spotify.com/track/42XfiOCf9wEL8RSSK1SeBz",
    },
    {
      release: "release/pentatonix-at-home-2",
      discNumber: 1,
      position: 2,
      externalId: "5YPyqJF0hcqp0vpAeLj2db",
      externalLink: "https://open.spotify.com/track/5YPyqJF0hcqp0vpAeLj2db",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
