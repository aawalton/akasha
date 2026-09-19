import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3FollowYouFollowYou = {
  id: "01a0afa2-0247-7ca9-845b-d9d0cab05439",
  type: "page-type/track",
  slug: "the-piano-guys-3-follow-you-follow-you",
  ownLength: 3.186,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-follow-you"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3TuSr70bXooym0mzwYBdtx",
      externalLink: "https://open.spotify.com/track/3TuSr70bXooym0mzwYBdtx",
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
