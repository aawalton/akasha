import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayYellowYellow = {
  id: "01a0b9ef-03a2-7011-85eb-a13874dde73e",
  type: "page-type/track",
  slug: "coldplay-yellow-yellow",
  ownLength: 4.4462166666666665,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-yellow"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3e0wYnFxkqinmtXebYPMSt",
      externalLink: "https://open.spotify.com/track/3e0wYnFxkqinmtXebYPMSt",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Yellow",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "yellow|4gzpq5DPGxSnKTe4SA8HAU|266773",
  song: "song/coldplay-yellow",
} as const satisfies Track
