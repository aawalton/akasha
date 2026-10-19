import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixEvergreenThePrayer = {
  id: "01a1546f-24f8-792e-8285-4a8d2fa28410",
  type: "page-type/track",
  slug: "pentatonix-evergreen-the-prayer",
  ownLength: 4.354933333333333,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-evergreen"],
  status: "not-started",
  unit: "unit/minutes",
  title: "The Prayer",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "theprayer|26AHtbjWKiwYzsoGoUZq53|261296",
  song: "song/pentatonix-the-prayer",
  carriedBy: [
    {
      release: "release/pentatonix-evergreen",
      discNumber: 1,
      position: 7,
      externalId: "4UcdqtJDDSYToxtsBZzkFX",
      externalLink: "https://open.spotify.com/track/4UcdqtJDDSYToxtsBZzkFX",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
