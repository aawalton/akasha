import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ChillAbrahamLincolnTribute = {
  id: "01a0afa1-e15e-73fb-9d69-d8f050dccbce",
  type: "page-type/track",
  slug: "the-piano-guys-3-chill-abraham-lincoln-tribute",
  ownLength: 4.578033333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-chill"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2ahakOtTjLhMkHU3nRqkmV",
      externalLink: "https://open.spotify.com/track/2ahakOtTjLhMkHU3nRqkmV",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Abraham Lincoln Tribute",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "abrahamlincolntribute|0jW6R8CVyVohuUJVcuweDI|274682",
  song: "song/the-piano-guys-abraham-lincoln-tribute",
} as const satisfies Track
