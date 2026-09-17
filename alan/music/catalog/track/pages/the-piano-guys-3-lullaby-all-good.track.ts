import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LullabyAllGood = {
  id: "01a0afa1-ddaa-7dad-aeec-b15357b68e52",
  type: "page-type/track",
  slug: "the-piano-guys-3-lullaby-all-good",
  ownLength: 2.3907166666666666,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-lullaby"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2CVE8Vku4ZCs1Dv0BUHzQW",
      externalLink: "https://open.spotify.com/track/2CVE8Vku4ZCs1Dv0BUHzQW",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "All Good",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "allgood|0jW6R8CVyVohuUJVcuweDI|143443",
} as const satisfies Track
