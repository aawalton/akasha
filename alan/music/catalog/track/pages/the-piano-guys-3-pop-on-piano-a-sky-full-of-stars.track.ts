import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3PopOnPianoASkyFullOfStars = {
  id: "01a0afa1-ceca-7432-a5c5-44e68802d05a",
  type: "page-type/track",
  slug: "the-piano-guys-3-pop-on-piano-a-sky-full-of-stars",
  ownLength: 4.0909,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-pop-on-piano"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2PFaSutzMUXaJNNt5SCn0H",
      externalLink: "https://open.spotify.com/track/2PFaSutzMUXaJNNt5SCn0H",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "A Sky Full Of Stars",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "askyfullofstars|0jW6R8CVyVohuUJVcuweDI|245454",
} as const satisfies Track
