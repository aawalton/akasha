import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const girlInRedYouNeedMeNowFeatSabrinaCarpenterYouNeedMeNowFeatSabrinaCarpenter = {
  id: "01a0b111-2c72-7031-93b2-c477c526e7f7",
  type: "page-type/track",
  slug: "girl-in-red-you-need-me-now-feat-sabrina-carpenter-you-need-me-now-feat-sabrina-carpenter",
  ownLength: 3.1062833333333333,
  ownProgress: 0,
  partOfCollections: ["release/girl-in-red-you-need-me-now-feat-sabrina-carpenter"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3zPGZBbZEGqu7eY7R0NkqI",
      externalLink: "https://open.spotify.com/track/3zPGZBbZEGqu7eY7R0NkqI",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "You Need Me Now? (feat. Sabrina Carpenter)",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [
    { externalId: "3uwAm6vQy7kWPS2bciKWx9", artistName: "girl in red" },
    { externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" },
  ],
  trackKey: "youneedmenowfeatsabrinacarpenter|3uwAm6vQy7kWPS2bciKWx9,74KM79TiuVKeVCqs8QtB0B|186377",
  song: "song/girl-in-red-you-need-me-now",
} as const satisfies Track
