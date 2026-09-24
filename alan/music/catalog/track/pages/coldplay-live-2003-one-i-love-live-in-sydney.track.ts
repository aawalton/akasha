import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2003OneILoveLiveInSydney = {
  id: "01a0b9ee-e643-7f8e-ad32-cd9cfe754679",
  type: "page-type/track",
  slug: "coldplay-live-2003-one-i-love-live-in-sydney",
  ownLength: 5.140433333333333,
  ownProgress: 5.140433333333333,
  partOfCollections: ["release/coldplay-live-2003"],
  status: "completed",
  unit: "unit/minutes",
  title: "One I Love - Live in Sydney",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "oneiloveliveinsydney|4gzpq5DPGxSnKTe4SA8HAU|308426",
  song: "song/coldplay-one-i-love",
  carriedBy: [
    {
      release: "release/coldplay-live-2003",
      discNumber: 1,
      position: 4,
      externalId: "0bQQv5RqwLmOKNaMcfJ1If",
      externalLink: "https://open.spotify.com/track/0bQQv5RqwLmOKNaMcfJ1If",
    },
  ],
} as const satisfies Track
