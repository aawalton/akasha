import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLostLost2 = {
  id: "01a0b9ee-fb4c-729c-ade2-ca00c3a7eaf8",
  type: "page-type/track",
  slug: "coldplay-lost-lost-2",
  ownLength: 3.7008833333333335,
  ownProgress: 3.7008833333333335,
  partOfCollections: ["release/coldplay-lost"],
  status: "completed",
  unit: "unit/minutes",
  title: "Lost?",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "lost|4gzpq5DPGxSnKTe4SA8HAU|222053",
  song: "song/coldplay-lost",
  carriedBy: [
    {
      release: "release/coldplay-lost",
      discNumber: 1,
      position: 2,
      externalId: "7lFdAhKhZs5lpjAVX8OzIj",
      externalLink: "https://open.spotify.com/track/7lFdAhKhZs5lpjAVX8OzIj",
    },
  ],
} as const satisfies Track
