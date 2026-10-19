import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixEvergreenEvergreen = {
  id: "01a1546f-24f7-7f9e-94d6-6e4d0e04fd0b",
  type: "page-type/track",
  slug: "pentatonix-evergreen-evergreen",
  ownLength: 3.0174333333333334,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-evergreen"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Evergreen",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "evergreen|26AHtbjWKiwYzsoGoUZq53|181046",
  song: "song/pentatonix-evergreen",
  carriedBy: [
    {
      release: "release/pentatonix-evergreen",
      discNumber: 1,
      position: 8,
      externalId: "0NmcSiRhVTjvsHTxnnBWa9",
      externalLink: "https://open.spotify.com/track/0NmcSiRhVTjvsHTxnnBWa9",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
