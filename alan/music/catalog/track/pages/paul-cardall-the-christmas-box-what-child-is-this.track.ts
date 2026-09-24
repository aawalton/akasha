import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxWhatChildIsThis = {
  id: "01a0b4c8-65eb-71cf-b043-1b50be67b149",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-what-child-is-this",
  ownLength: 3.12155,
  ownProgress: 3.12155,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  status: "completed",
  unit: "unit/minutes",
  title: "What Child Is This?",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "whatchildisthis|7FQRbf8gbKw8KZQZAJWxH2|187293",
  song: "song/paul-cardall-what-child-is-this",
  carriedBy: [
    {
      release: "release/paul-cardall-the-christmas-box",
      discNumber: 1,
      position: 10,
      externalId: "1GXSKVaTRh4uxAqy8ZoiYG",
      externalLink: "https://open.spotify.com/track/1GXSKVaTRh4uxAqy8ZoiYG",
    },
  ],
} as const satisfies Track
