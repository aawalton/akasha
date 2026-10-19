import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixEvergreenRiver = {
  id: "01a1546f-24f8-7ea9-b45f-d01a758192e3",
  type: "page-type/track",
  slug: "pentatonix-evergreen-river",
  ownLength: 2.2841,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-evergreen"],
  status: "not-started",
  unit: "unit/minutes",
  title: "River",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "river|26AHtbjWKiwYzsoGoUZq53|137046",
  song: "song/pentatonix-river",
  carriedBy: [
    {
      release: "release/pentatonix-evergreen",
      discNumber: 1,
      position: 5,
      externalId: "00UGEVoBck0MmVuNQcmnxj",
      externalLink: "https://open.spotify.com/track/00UGEVoBck0MmVuNQcmnxj",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
