import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeArabesque = {
  id: "01a0b9ee-cfc9-747d-bbfb-83eadb7fdb36",
  type: "page-type/track",
  slug: "coldplay-everyday-life-arabesque",
  ownLength: 5.671333333333333,
  ownProgress: 5.671333333333333,
  partOfCollections: ["release/coldplay-everyday-life", "release/coldplay-orphans-arabesque"],
  status: "completed",
  unit: "unit/minutes",
  title: "Arabesque",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "arabesque|4gzpq5DPGxSnKTe4SA8HAU|340280",
  song: "song/coldplay-arabesque",
  carriedBy: [
    {
      release: "release/coldplay-everyday-life",
      discNumber: 1,
      position: 7,
      externalId: "0ZlVUhjO8c0bOx1D2Btznf",
      externalLink: "https://open.spotify.com/track/0ZlVUhjO8c0bOx1D2Btznf",
    },
    {
      release: "release/coldplay-orphans-arabesque",
      discNumber: 1,
      position: 2,
      externalId: "2Z1HknKRrvUv5cheidF8Ag",
      externalLink: "https://open.spotify.com/track/2Z1HknKRrvUv5cheidF8Ag",
    },
  ],
} as const satisfies Track
