import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2SongsFromTheHeartFieldsOfGold = {
  id: "01a0abea-7264-778e-b5a9-b0f4e5be22f8",
  type: "page-type/track",
  slug: "celtic-woman-2-songs-from-the-heart-fields-of-gold",
  ownLength: 3.8273333333333333,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-songs-from-the-heart"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1nE3flyqkY3H3sicuO44OP",
      externalLink: "https://open.spotify.com/track/1nE3flyqkY3H3sicuO44OP",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Fields Of Gold",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "fieldsofgold|6NWtt9pNOL2Gx7kBykdE5x|229640",
  song: "song/celtic-woman-fields-of-gold",
} as const satisfies Track
