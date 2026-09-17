import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LimitlessDna = {
  id: "01a0afa2-0ea1-739b-b899-79f41c95c60f",
  type: "page-type/track",
  slug: "the-piano-guys-3-limitless-dna",
  ownLength: 3.0923,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-limitless"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4YlcFwGTFW7HLJHTTdDn3R",
      externalLink: "https://open.spotify.com/track/4YlcFwGTFW7HLJHTTdDn3R",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "DNA",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "dna|0jW6R8CVyVohuUJVcuweDI|185538",
} as const satisfies Track
