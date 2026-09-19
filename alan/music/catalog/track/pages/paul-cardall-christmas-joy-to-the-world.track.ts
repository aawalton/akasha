import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasJoyToTheWorld = {
  id: "01a0b4c8-3470-7242-b960-c04175f12ee7",
  type: "page-type/track",
  slug: "paul-cardall-christmas-joy-to-the-world",
  ownLength: 5.026433333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-christmas"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3AmEWmlk9G8Xhn0zctTCO1",
      externalLink: "https://open.spotify.com/track/3AmEWmlk9G8Xhn0zctTCO1",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Joy to the World",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "joytotheworld|7FQRbf8gbKw8KZQZAJWxH2|301586",
  song: "song/celtic-woman-joy-to-the-world",
} as const satisfies Track
