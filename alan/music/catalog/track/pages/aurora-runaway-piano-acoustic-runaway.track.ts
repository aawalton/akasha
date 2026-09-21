import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraRunawayPianoAcousticRunaway = {
  id: "01a0b638-05ec-74aa-adef-ff018b0d6faf",
  type: "page-type/track",
  slug: "aurora-runaway-piano-acoustic-runaway",
  ownLength: 4.1471,
  ownProgress: 4.1471,
  partOfCollections: ["release/aurora-runaway-piano-acoustic"],
  position: 3,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0EWDeNn8xgYecSSnKmRok8",
      externalLink: "https://open.spotify.com/track/0EWDeNn8xgYecSSnKmRok8",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Runaway",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "runaway|1WgXqy2Dd70QQOU7Ay074N|248826",
  song: "song/aurora-runaway",
  carriedBy: [
    {
      release: "release/aurora-runaway-piano-acoustic",
      discNumber: 1,
      position: 3,
      externalId: "0EWDeNn8xgYecSSnKmRok8",
      externalLink: "https://open.spotify.com/track/0EWDeNn8xgYecSSnKmRok8",
    },
  ],
} as const satisfies Track
