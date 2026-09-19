import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3Unstoppable2FollowYou = {
  id: "01a0afa1-db2c-7322-a4c4-935c9d26262e",
  type: "page-type/track",
  slug: "the-piano-guys-3-unstoppable-2-follow-you",
  ownLength: 3.186,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-unstoppable-2"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7sbUz0bj7ycK7C748gzc58",
      externalLink: "https://open.spotify.com/track/7sbUz0bj7ycK7C748gzc58",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Follow You",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "followyou|0jW6R8CVyVohuUJVcuweDI|191160",
  song: "song/the-piano-guys-follow-you",
} as const satisfies Track
