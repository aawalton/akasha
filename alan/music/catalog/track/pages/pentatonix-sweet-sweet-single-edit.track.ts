import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixSweetSweetSingleEdit = {
  id: "01a1546f-24fe-74fb-abc5-50ed496687a2",
  type: "page-type/track",
  slug: "pentatonix-sweet-sweet-single-edit",
  ownLength: 2.6373,
  ownProgress: 2.6373,
  partOfCollections: ["release/pentatonix-sweet"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sweet (Single Edit)",
  trackType: "version",
  explicit: false,
  trackArtist: [
    { artistName: "Jon Batiste" },
    { artist: "artist/pentatonix" },
    { artistName: "Diane Warren" },
  ],
  trackKey:
    "sweetsingleedit|0eRbECAGCLLiTyVXPBRexU,26AHtbjWKiwYzsoGoUZq53,3A2jfQOLgo5rV4GYFHbEA2|158238",
  song: "song/pentatonix-sweet",
  carriedBy: [
    {
      release: "release/pentatonix-sweet",
      discNumber: 1,
      position: 1,
      externalId: "6o7Ge6JFuDGZXfV2KfkJ3T",
      externalLink: "https://open.spotify.com/track/6o7Ge6JFuDGZXfV2KfkJ3T",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T14:01:21.162Z",
  progressedAt: "2026-10-19T14:01:21.162Z",
} as const satisfies Track
