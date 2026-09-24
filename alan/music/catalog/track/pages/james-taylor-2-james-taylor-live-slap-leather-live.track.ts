import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveSlapLeatherLive = {
  id: "01a0abeb-3e83-7312-92cb-327ffd9477fd",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-slap-leather-live",
  ownLength: 2.148216666666667,
  ownProgress: 2.148216666666667,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Slap Leather - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "slapleatherlive|0vn7UBvSQECKJm2817Yf1P|128893",
  song: "song/james-taylor-slap-leather",
  carriedBy: [
    {
      release: "release/james-taylor-2-james-taylor-live",
      discNumber: 2,
      position: 9,
      externalId: "67tQdAHqvaXIx7wvlsFkoq",
      externalLink: "https://open.spotify.com/track/67tQdAHqvaXIx7wvlsFkoq",
    },
  ],
} as const satisfies Track
