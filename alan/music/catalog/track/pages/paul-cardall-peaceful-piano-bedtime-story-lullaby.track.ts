import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoBedtimeStoryLullaby = {
  id: "01a0b4c8-3323-72eb-8d7a-365d7531ce5c",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-bedtime-story-lullaby",
  ownLength: 2.518,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "48J6WaPuGaXbR3nfPgDkWf",
      externalLink: "https://open.spotify.com/track/48J6WaPuGaXbR3nfPgDkWf",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Bedtime Story Lullaby",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "bedtimestorylullaby|7FQRbf8gbKw8KZQZAJWxH2|151080",
  song: "song/paul-cardall-bedtime-story-lullaby",
} as const satisfies Track
