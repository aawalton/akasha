import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplaySomethingJustLikeThisSomethingJustLikeThis = {
  id: "01a0b9ee-f385-7980-9219-37760b797de6",
  type: "page-type/track",
  slug: "coldplay-something-just-like-this-something-just-like-this",
  ownLength: 4.1271,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-something-just-like-this"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1dNIEtp7AY3oDAKCGg2XkH",
      externalLink: "https://open.spotify.com/track/1dNIEtp7AY3oDAKCGg2XkH",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Something Just Like This",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "69GGBxA162lTqCwzJG5jLp", artistName: "The Chainsmokers" },
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
  ],
  trackKey: "somethingjustlikethis|4gzpq5DPGxSnKTe4SA8HAU,69GGBxA162lTqCwzJG5jLp|247626",
  song: "song/coldplay-something-just-like-this",
} as const satisfies Track
