import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsMercuryActs12Cutthroat = {
  id: "01a0c43f-c41a-7336-9abc-3e0926e2d99d",
  type: "page-type/track",
  slug: "imagine-dragons-mercury-acts-1-2-cutthroat",
  ownLength: 2.8290166666666665,
  ownProgress: 2.8290166666666665,
  partOfCollections: ["release/imagine-dragons-mercury-acts-1-2"],
  position: 12,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5KXp9E22MHunsS4W4PNBUf",
      externalLink: "https://open.spotify.com/track/5KXp9E22MHunsS4W4PNBUf",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Cutthroat",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "cutthroat|53XhwfbYqKCa1cC15pYq2q|169741",
  song: "song/imagine-dragons-cutthroat",
  carriedBy: [
    {
      release: "release/imagine-dragons-mercury-acts-1-2",
      discNumber: 1,
      position: 12,
      externalId: "5KXp9E22MHunsS4W4PNBUf",
      externalLink: "https://open.spotify.com/track/5KXp9E22MHunsS4W4PNBUf",
    },
  ],
} as const satisfies Track
