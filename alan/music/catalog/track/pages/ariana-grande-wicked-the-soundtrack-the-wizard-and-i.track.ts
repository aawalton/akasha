import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeWickedTheSoundtrackTheWizardAndI = {
  id: "01a0a6c5-4c2e-761e-a4de-38744e648c2d",
  type: "page-type/track",
  slug: "ariana-grande-wicked-the-soundtrack-the-wizard-and-i",
  ownLength: 5.6143,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-wicked-the-soundtrack"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1foaMdjhl4LNVQFYxMZANx",
      externalLink: "https://open.spotify.com/track/1foaMdjhl4LNVQFYxMZANx",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "The Wizard And I",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "46UMQ0cW8ToR8egkBRwAxZ", artistName: "Cynthia Erivo" },
    { externalId: "5IaJcuBeBkVqhGAzxMciwu", artistName: "Michelle Yeoh" },
  ],
  trackKey: "thewizardandi|46UMQ0cW8ToR8egkBRwAxZ,5IaJcuBeBkVqhGAzxMciwu|336858",
  song: "song/ariana-grande-the-wizard-and-i",
} as const satisfies Track
