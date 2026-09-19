import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsOffTheTableWithTheWeeknd = {
  id: "01a0a6c5-21a7-7e1e-977c-b1215e391eea",
  type: "page-type/track",
  slug: "ariana-grande-positions-off-the-table-with-the-weeknd",
  ownLength: 3.99915,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-positions"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7E1jVNoWuemqUryI4FxsVD",
      externalLink: "https://open.spotify.com/track/7E1jVNoWuemqUryI4FxsVD",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "off the table (with The Weeknd)",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "1Xyo4u8uXC1ZmMpatF05PJ", artistName: "The Weeknd" },
  ],
  trackKey: "offthetablewiththeweeknd|1Xyo4u8uXC1ZmMpatF05PJ,66CXWjxzNUsdJxJ2JdwvnR|239949",
  song: "song/ariana-grande-off-the-table",
} as const satisfies Track
