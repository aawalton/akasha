import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsMercuryActs12PeaceOfMind = {
  id: "01a0c43f-c667-72f4-9bff-eeb83797cf6d",
  type: "page-type/track",
  slug: "imagine-dragons-mercury-acts-1-2-peace-of-mind",
  ownLength: 2.8988,
  ownProgress: 2.8988,
  partOfCollections: ["release/imagine-dragons-mercury-acts-1-2"],
  position: 12,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3bwvtkLyVe7YWrKRlViloR",
      externalLink: "https://open.spotify.com/track/3bwvtkLyVe7YWrKRlViloR",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Peace Of Mind",
  trackType: "studio",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "peaceofmind|53XhwfbYqKCa1cC15pYq2q|173928",
  song: "song/imagine-dragons-peace-of-mind",
} as const satisfies Track
