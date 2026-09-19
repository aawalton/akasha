import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxWhatChildIsThis = {
  id: "01a0b4c8-65eb-71cf-b043-1b50be67b149",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-what-child-is-this",
  ownLength: 3.12155,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1GXSKVaTRh4uxAqy8ZoiYG",
      externalLink: "https://open.spotify.com/track/1GXSKVaTRh4uxAqy8ZoiYG",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "What Child Is This?",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "whatchildisthis|7FQRbf8gbKw8KZQZAJWxH2|187293",
  song: "song/paul-cardall-what-child-is-this",
} as const satisfies Track
