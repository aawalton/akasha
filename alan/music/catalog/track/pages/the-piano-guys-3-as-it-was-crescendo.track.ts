import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3AsItWasCrescendo = {
  id: "01a0afa1-ff47-7c69-8bcd-cbb5dc0ab47b",
  type: "page-type/track",
  slug: "the-piano-guys-3-as-it-was-crescendo",
  ownLength: 3.2361,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-as-it-was"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3T6g8ClHPujXB8EUABssls",
      externalLink: "https://open.spotify.com/track/3T6g8ClHPujXB8EUABssls",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Crescendo",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "crescendo|0jW6R8CVyVohuUJVcuweDI|194166",
  song: "song/the-piano-guys-crescendo",
} as const satisfies Track
