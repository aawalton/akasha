import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixMadWorldMadWorld = {
  id: "01a1546f-24fa-770f-9042-71c890fc6f2e",
  type: "page-type/track",
  slug: "pentatonix-mad-world-mad-world",
  ownLength: 3.53395,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-mad-world"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Mad World",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "madworld|26AHtbjWKiwYzsoGoUZq53|212037",
  song: "song/pentatonix-mad-world",
  carriedBy: [
    {
      release: "release/pentatonix-mad-world",
      discNumber: 1,
      position: 1,
      externalId: "1AZOOzWfuGYlteFBNIzwmd",
      externalLink: "https://open.spotify.com/track/1AZOOzWfuGYlteFBNIzwmd",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
