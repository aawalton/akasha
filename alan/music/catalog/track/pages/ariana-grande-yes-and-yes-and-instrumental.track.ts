import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYesAndYesAndInstrumental = {
  id: "01a0a6c5-3529-77a8-872b-a5f64dc72fa6",
  type: "page-type/track",
  slug: "ariana-grande-yes-and-yes-and-instrumental",
  ownLength: 3.5832333333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-yes-and"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3lZu2q4dHAFQ8Rc5TKjQG1",
      externalLink: "https://open.spotify.com/track/3lZu2q4dHAFQ8Rc5TKjQG1",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "yes, and? - instrumental",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "yesandinstrumental|66CXWjxzNUsdJxJ2JdwvnR|214994",
  song: "song/ariana-grande-yes-and-2",
} as const satisfies Track
