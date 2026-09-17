import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysAutumnOnPianoGrowAsWeGo = {
  id: "01a0afa1-bf72-764c-9aeb-4f40d4dcd2d7",
  type: "page-type/track",
  slug: "the-piano-guys-autumn-on-piano-grow-as-we-go",
  ownLength: 4.3148,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-autumn-on-piano"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "78oxoexZ4dj7KfbTbEhw1M",
      externalLink: "https://open.spotify.com/track/78oxoexZ4dj7KfbTbEhw1M",
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
