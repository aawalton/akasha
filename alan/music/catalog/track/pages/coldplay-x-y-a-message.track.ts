import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayXYAMessage = {
  id: "01a0b9ee-e4e2-78b0-9942-3e11c8345a4f",
  type: "page-type/track",
  slug: "coldplay-x-y-a-message",
  ownLength: 4.75575,
  ownProgress: 4.75575,
  partOfCollections: ["release/coldplay-x-y"],
  status: "completed",
  unit: "unit/minutes",
  title: "A Message",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "amessage|4gzpq5DPGxSnKTe4SA8HAU|285345",
  song: "song/coldplay-a-message",
  carriedBy: [
    {
      release: "release/coldplay-x-y",
      discNumber: 1,
      position: 8,
      externalId: "2w3eXFL86RgxGtDr8bzwgK",
      externalLink: "https://open.spotify.com/track/2w3eXFL86RgxGtDr8bzwgK",
    },
  ],
} as const satisfies Track
