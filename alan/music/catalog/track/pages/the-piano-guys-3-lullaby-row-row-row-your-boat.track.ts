import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LullabyRowRowRowYourBoat = {
  id: "01a0afa1-dee4-79e7-a733-3406adeb9ff4",
  type: "page-type/track",
  slug: "the-piano-guys-3-lullaby-row-row-row-your-boat",
  ownLength: 1.6733333333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-lullaby"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0p9KHrE7ztrxx5YUa9u821",
      externalLink: "https://open.spotify.com/track/0p9KHrE7ztrxx5YUa9u821",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Row Row Row Your Boat",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "rowrowrowyourboat|0jW6R8CVyVohuUJVcuweDI|100400",
  song: "song/the-piano-guys-row-row-row-your-boat",
} as const satisfies Track
