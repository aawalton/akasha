import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ChillGrowAsWeGo = {
  id: "01a0afa1-e1e7-76d5-9702-540721f1b059",
  type: "page-type/track",
  slug: "the-piano-guys-3-chill-grow-as-we-go",
  ownLength: 4.3148,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-chill"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "631NzqPL2I4XHsK76E9390",
      externalLink: "https://open.spotify.com/track/631NzqPL2I4XHsK76E9390",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Grow As We Go",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
    { externalId: "2LpGg3qukmprl5BSlBk6HM", artistName: "Sarah Schmidt" },
    { externalId: "0rNPZyO8TwKKCnysRUzksl", artistName: "Lucy Nelson" },
  ],
  trackKey:
    "growaswego|0jW6R8CVyVohuUJVcuweDI,0rNPZyO8TwKKCnysRUzksl,2LpGg3qukmprl5BSlBk6HM|258888",
} as const satisfies Track
