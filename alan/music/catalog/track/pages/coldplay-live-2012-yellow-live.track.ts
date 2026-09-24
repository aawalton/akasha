import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2012YellowLive = {
  id: "01a0b9ee-da20-7b4d-8bcb-ed9f4c1a1ec7",
  type: "page-type/track",
  slug: "coldplay-live-2012-yellow-live",
  ownLength: 6.866216666666666,
  ownProgress: 6.866216666666666,
  partOfCollections: ["release/coldplay-live-2012"],
  status: "completed",
  unit: "unit/minutes",
  title: "Yellow - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "yellowlive|4gzpq5DPGxSnKTe4SA8HAU|411973",
  song: "song/coldplay-yellow",
  carriedBy: [
    {
      release: "release/coldplay-live-2012",
      discNumber: 1,
      position: 5,
      externalId: "58MrV6J9oS46ViY1N6gTJX",
      externalLink: "https://open.spotify.com/track/58MrV6J9oS46ViY1N6gTJX",
    },
  ],
} as const satisfies Track
