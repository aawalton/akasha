import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayFixYou2FixYou = {
  id: "01a0b9ee-ff5c-7e2e-96a2-fa4928c908a7",
  type: "page-type/track",
  slug: "coldplay-fix-you-2-fix-you",
  ownLength: 4.623333333333333,
  ownProgress: 4.623333333333333,
  partOfCollections: ["release/coldplay-fix-you-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "Fix You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "fixyou|4gzpq5DPGxSnKTe4SA8HAU|277400",
  song: "song/coldplay-fix-you",
  carriedBy: [
    {
      release: "release/coldplay-fix-you-2",
      discNumber: 1,
      position: 1,
      externalId: "6YAbIZPjyQ5euHxyxUgRoQ",
      externalLink: "https://open.spotify.com/track/6YAbIZPjyQ5euHxyxUgRoQ",
    },
  ],
} as const satisfies Track
