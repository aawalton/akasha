import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NeverDieYoungSweetPotatoPie = {
  id: "01a0abeb-4153-76e5-89ad-ec40561a3f58",
  type: "page-type/track",
  slug: "james-taylor-2-never-die-young-sweet-potato-pie",
  ownLength: 3.5137666666666667,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-never-die-young"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "49E3znGU6pKjxpjch2oCCM",
      externalLink: "https://open.spotify.com/track/49E3znGU6pKjxpjch2oCCM",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Sweet Potato Pie",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "sweetpotatopie|0vn7UBvSQECKJm2817Yf1P|210826",
} as const satisfies Track
