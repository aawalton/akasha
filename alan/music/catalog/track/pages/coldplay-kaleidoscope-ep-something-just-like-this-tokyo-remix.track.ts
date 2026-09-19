import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayKaleidoscopeEpSomethingJustLikeThisTokyoRemix = {
  id: "01a0b9ee-f210-724b-a9a6-c32646a38978",
  type: "page-type/track",
  slug: "coldplay-kaleidoscope-ep-something-just-like-this-tokyo-remix",
  ownLength: 4.562433333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-kaleidoscope-ep"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "255wsg35VRYqBK7uBtYOUz",
      externalLink: "https://open.spotify.com/track/255wsg35VRYqBK7uBtYOUz",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Something Just Like This - Tokyo Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "69GGBxA162lTqCwzJG5jLp", artistName: "The Chainsmokers" },
  ],
  trackKey: "somethingjustlikethistokyoremix|4gzpq5DPGxSnKTe4SA8HAU,69GGBxA162lTqCwzJG5jLp|273746",
  song: "song/coldplay-something-just-like-this",
} as const satisfies Track
