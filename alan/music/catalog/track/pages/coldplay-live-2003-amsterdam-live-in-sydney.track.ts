import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2003AmsterdamLiveInSydney = {
  id: "01a0b9ee-e767-70e3-926b-581041519866",
  type: "page-type/track",
  slug: "coldplay-live-2003-amsterdam-live-in-sydney",
  ownLength: 5.336,
  ownProgress: 5.336,
  partOfCollections: ["release/coldplay-live-2003"],
  status: "completed",
  unit: "unit/minutes",
  title: "Amsterdam - Live in Sydney",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "amsterdamliveinsydney|4gzpq5DPGxSnKTe4SA8HAU|320160",
  song: "song/coldplay-amsterdam",
  carriedBy: [
    {
      release: "release/coldplay-live-2003",
      discNumber: 1,
      position: 12,
      externalId: "3TQs5AmPNEnnTNSXzCQV7G",
      externalLink: "https://open.spotify.com/track/3TQs5AmPNEnnTNSXzCQV7G",
    },
  ],
} as const satisfies Track
