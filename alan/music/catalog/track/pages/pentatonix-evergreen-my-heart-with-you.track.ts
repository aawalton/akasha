import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixEvergreenMyHeartWithYou = {
  id: "01a1546f-24f7-7882-adf2-f0a7d224daf3",
  type: "page-type/track",
  slug: "pentatonix-evergreen-my-heart-with-you",
  ownLength: 4.5532,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-evergreen"],
  status: "not-started",
  unit: "unit/minutes",
  title: "My Heart With You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "myheartwithyou|26AHtbjWKiwYzsoGoUZq53|273192",
  song: "song/pentatonix-my-heart-with-you",
  carriedBy: [
    {
      release: "release/pentatonix-evergreen",
      discNumber: 1,
      position: 13,
      externalId: "4GlZfnkn2zcggEcUSaPTk3",
      externalLink: "https://open.spotify.com/track/4GlZfnkn2zcggEcUSaPTk3",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
