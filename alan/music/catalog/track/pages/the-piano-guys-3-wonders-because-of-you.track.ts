import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WondersBecauseOfYou = {
  id: "01a0afa2-16db-719b-95b5-cf39929b7745",
  type: "page-type/track",
  slug: "the-piano-guys-3-wonders-because-of-you",
  ownLength: 4.04755,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-wonders"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7KDCIv5nMgL5f5u6xbUVZq",
      externalLink: "https://open.spotify.com/track/7KDCIv5nMgL5f5u6xbUVZq",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Because of You",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "becauseofyou|0jW6R8CVyVohuUJVcuweDI|242853",
  song: "song/the-piano-guys-because-of-you",
} as const satisfies Track
