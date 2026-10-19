import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixPentatonixDeluxeVersionSing = {
  id: "01a1546f-24fb-7892-81a1-5751cbf99fcb",
  type: "page-type/track",
  slug: "pentatonix-pentatonix-deluxe-version-sing",
  ownLength: 2.953866666666667,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-pentatonix-deluxe-version"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Sing",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "sing|26AHtbjWKiwYzsoGoUZq53|177232",
  song: "song/pentatonix-sing",
  carriedBy: [
    {
      release: "release/pentatonix-pentatonix-deluxe-version",
      discNumber: 1,
      position: 3,
      externalId: "4940HtUKC4VDtiC5s4t4MT",
      externalLink: "https://open.spotify.com/track/4940HtUKC4VDtiC5s4t4MT",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
