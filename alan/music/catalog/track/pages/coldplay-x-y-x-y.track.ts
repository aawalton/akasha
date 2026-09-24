import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayXYXY = {
  id: "01a0b9ee-e49b-7f7a-8695-27d0107146dd",
  type: "page-type/track",
  slug: "coldplay-x-y-x-y",
  ownLength: 4.569583333333333,
  ownProgress: 4.569583333333333,
  partOfCollections: ["release/coldplay-x-y"],
  status: "completed",
  unit: "unit/minutes",
  title: "X&Y",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "xy|4gzpq5DPGxSnKTe4SA8HAU|274175",
  song: "song/coldplay-x-y",
  carriedBy: [
    {
      release: "release/coldplay-x-y",
      discNumber: 1,
      position: 6,
      externalId: "2rxp56vVQp1zzumJ0eHLmw",
      externalLink: "https://open.spotify.com/track/2rxp56vVQp1zzumJ0eHLmw",
    },
  ],
} as const satisfies Track
