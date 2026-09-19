import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LimitlessNorthCape = {
  id: "01a0afa2-0f41-71d2-9d19-9cfb1b7bef8d",
  type: "page-type/track",
  slug: "the-piano-guys-3-limitless-north-cape",
  ownLength: 2.9937,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-limitless"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7LdwWWep99mc0L5c1gY8e7",
      externalLink: "https://open.spotify.com/track/7LdwWWep99mc0L5c1gY8e7",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "North Cape",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "northcape|0jW6R8CVyVohuUJVcuweDI|179622",
  song: "song/the-piano-guys-north-cape",
} as const satisfies Track
