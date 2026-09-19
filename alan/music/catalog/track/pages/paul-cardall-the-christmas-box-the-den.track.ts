import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxTheDen = {
  id: "01a0b4c8-654f-7b92-8cd5-455589a813ad",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-the-den",
  ownLength: 2.2582166666666668,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3XD6ZjndAIEUCUcqQkVdHg",
      externalLink: "https://open.spotify.com/track/3XD6ZjndAIEUCUcqQkVdHg",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Den",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "theden|7FQRbf8gbKw8KZQZAJWxH2|135493",
  song: "song/paul-cardall-the-den",
} as const satisfies Track
