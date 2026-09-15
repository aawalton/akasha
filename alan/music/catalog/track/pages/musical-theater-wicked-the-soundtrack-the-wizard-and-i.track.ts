import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const musicalTheaterWickedTheSoundtrackTheWizardAndI = {
  id: "01a0a6c5-11b4-782f-a44c-793758842ec5",
  type: "page-type/track",
  slug: "musical-theater-wicked-the-soundtrack-the-wizard-and-i",
  ownLength: 5.6143,
  ownProgress: 0,
  partOfCollections: ["release/musical-theater-wicked-the-soundtrack"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4mxj6SQ7BxfQ90CBTbxcwH",
      externalLink: "https://open.spotify.com/track/4mxj6SQ7BxfQ90CBTbxcwH",
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
} as const satisfies Track
