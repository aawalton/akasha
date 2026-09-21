import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LimitlessLimitless = {
  id: "01a0afa2-0e82-7d96-a088-e89a2cdd2449",
  type: "page-type/track",
  slug: "the-piano-guys-3-limitless-limitless",
  ownLength: 4.515616666666666,
  ownProgress: 4.515616666666666,
  partOfCollections: ["release/the-piano-guys-3-limitless"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7hbxaTIqd5BRHhpCfn7dms",
      externalLink: "https://open.spotify.com/track/7hbxaTIqd5BRHhpCfn7dms",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Limitless",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "limitless|0jW6R8CVyVohuUJVcuweDI|270937",
  song: "song/the-piano-guys-limitless",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-limitless",
      discNumber: 1,
      position: 5,
      externalId: "7hbxaTIqd5BRHhpCfn7dms",
      externalLink: "https://open.spotify.com/track/7hbxaTIqd5BRHhpCfn7dms",
    },
  ],
} as const satisfies Track
