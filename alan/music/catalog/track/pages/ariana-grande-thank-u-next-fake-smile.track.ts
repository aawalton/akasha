import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeThankUNextFakeSmile = {
  id: "01a0a6c5-27e9-755b-9c47-f4fbb2f1cad7",
  type: "page-type/track",
  slug: "ariana-grande-thank-u-next-fake-smile",
  ownLength: 3.481333333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-thank-u-next"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3wFLWP0FcIqHK1wb1CPthQ",
      externalLink: "https://open.spotify.com/track/3wFLWP0FcIqHK1wb1CPthQ",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "fake smile",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "fakesmile|66CXWjxzNUsdJxJ2JdwvnR|208880",
  song: "song/ariana-grande-fake-smile",
} as const satisfies Track
