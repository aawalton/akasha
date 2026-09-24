import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2003EverythingsNotLostLiveInSydney = {
  id: "01a0b9ee-e6ba-7a9e-ab3e-4e662d00db2b",
  type: "page-type/track",
  slug: "coldplay-live-2003-everythings-not-lost-live-in-sydney",
  ownLength: 8.7971,
  ownProgress: 8.7971,
  partOfCollections: ["release/coldplay-live-2003"],
  status: "completed",
  unit: "unit/minutes",
  title: "Everything's Not Lost - Live in Sydney",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "everythingsnotlostliveinsydney|4gzpq5DPGxSnKTe4SA8HAU|527826",
  song: "song/coldplay-everythings-not-lost",
  carriedBy: [
    {
      release: "release/coldplay-live-2003",
      discNumber: 1,
      position: 7,
      externalId: "7IWbp0yWEF8nNjMLbKF0pU",
      externalLink: "https://open.spotify.com/track/7IWbp0yWEF8nNjMLbKF0pU",
    },
  ],
} as const satisfies Track
