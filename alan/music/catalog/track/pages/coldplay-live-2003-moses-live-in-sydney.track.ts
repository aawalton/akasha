import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2003MosesLiveInSydney = {
  id: "01a0b9ee-e6dc-70a8-bb21-455d36ed4283",
  type: "page-type/track",
  slug: "coldplay-live-2003-moses-live-in-sydney",
  ownLength: 5.4862166666666665,
  ownProgress: 5.4862166666666665,
  partOfCollections: ["release/coldplay-live-2003"],
  status: "completed",
  unit: "unit/minutes",
  title: "Moses - Live in Sydney",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "mosesliveinsydney|4gzpq5DPGxSnKTe4SA8HAU|329173",
  song: "song/coldplay-moses",
  carriedBy: [
    {
      release: "release/coldplay-live-2003",
      discNumber: 1,
      position: 8,
      externalId: "1n7a6D28s08972ImtPtaxX",
      externalLink: "https://open.spotify.com/track/1n7a6D28s08972ImtPtaxX",
    },
  ],
} as const satisfies Track
