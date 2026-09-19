import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LullabyEveryBreathYouTake = {
  id: "01a0afa1-ddcd-7637-8595-8544012fc71c",
  type: "page-type/track",
  slug: "the-piano-guys-3-lullaby-every-breath-you-take",
  ownLength: 4.536833333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-lullaby"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0LQd5wZco2ZMBnxhNl9Qbq",
      externalLink: "https://open.spotify.com/track/0LQd5wZco2ZMBnxhNl9Qbq",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Every Breath You Take",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "everybreathyoutake|0jW6R8CVyVohuUJVcuweDI|272210",
  song: "song/the-piano-guys-every-breath-you-take",
} as const satisfies Track
