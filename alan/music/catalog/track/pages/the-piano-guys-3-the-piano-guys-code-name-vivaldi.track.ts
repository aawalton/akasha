import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuysCodeNameVivaldi = {
  id: "01a0afa2-18e6-7527-8216-847e81241e59",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-code-name-vivaldi",
  ownLength: 4.114616666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5WKDDrq02f0mH3G1ZYmozK",
      externalLink: "https://open.spotify.com/track/5WKDDrq02f0mH3G1ZYmozK",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Code Name Vivaldi",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "codenamevivaldi|0jW6R8CVyVohuUJVcuweDI|246877",
} as const satisfies Track
