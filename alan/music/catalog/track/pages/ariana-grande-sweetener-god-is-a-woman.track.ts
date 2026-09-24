import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSweetenerGodIsAWoman = {
  id: "01a0a6c5-2997-7df2-9c4f-da7fdec60e7f",
  type: "page-type/track",
  slug: "ariana-grande-sweetener-god-is-a-woman",
  ownLength: 3.2924333333333333,
  ownProgress: 3.2924333333333333,
  partOfCollections: ["release/ariana-grande-sweetener"],
  status: "completed",
  unit: "unit/minutes",
  title: "God is a woman",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "godisawoman|66CXWjxzNUsdJxJ2JdwvnR|197546",
  song: "song/ariana-grande-god-is-a-woman",
  carriedBy: [
    {
      release: "release/ariana-grande-sweetener",
      discNumber: 1,
      position: 5,
      externalId: "5OCJzvD7sykQEKHH7qAC3C",
      externalLink: "https://open.spotify.com/track/5OCJzvD7sykQEKHH7qAC3C",
    },
  ],
} as const satisfies Track
