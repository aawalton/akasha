import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxTheStoneAngel = {
  id: "01a0b4c8-668a-71e4-9aba-43aa92a768e4",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-the-stone-angel",
  ownLength: 3.266,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0wUgIxjnKW5crPpHGlAnms",
      externalLink: "https://open.spotify.com/track/0wUgIxjnKW5crPpHGlAnms",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Stone Angel",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "thestoneangel|7FQRbf8gbKw8KZQZAJWxH2|195960",
  song: "song/paul-cardall-the-stone-angel",
} as const satisfies Track
