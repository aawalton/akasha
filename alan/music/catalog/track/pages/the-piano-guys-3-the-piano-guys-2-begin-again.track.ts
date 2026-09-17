import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuys2BeginAgain = {
  id: "01a0afa2-1fc6-77d4-b224-80e996afdbb8",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-2-begin-again",
  ownLength: 4.154166666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys-2"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0yZ9AtjultQdU5KL7mL1ai",
      externalLink: "https://open.spotify.com/track/0yZ9AtjultQdU5KL7mL1ai",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Begin Again",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "beginagain|0jW6R8CVyVohuUJVcuweDI|249250",
} as const satisfies Track
