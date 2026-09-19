import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310KungFuPianoCelloAscends = {
  id: "01a0afa2-0c9b-71f3-8ac0-1e5c8854c08b",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-kung-fu-piano-cello-ascends",
  ownLength: 4.04705,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-10"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6CR8JUW0AOPTGhCrz0P6dC",
      externalLink: "https://open.spotify.com/track/6CR8JUW0AOPTGhCrz0P6dC",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Kung Fu Piano: Cello Ascends",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "kungfupianocelloascends|0jW6R8CVyVohuUJVcuweDI|242823",
  song: "song/the-piano-guys-kung-fu-piano-cello-ascends",
} as const satisfies Track
