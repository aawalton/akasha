import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxJennasDance = {
  id: "01a0b4c8-6528-74f3-bea8-e264f8ca8724",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-jennas-dance",
  ownLength: 2.87,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0BUxohfM2qWelR8tKW7XeB",
      externalLink: "https://open.spotify.com/track/0BUxohfM2qWelR8tKW7XeB",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Jenna's Dance",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "jennasdance|7FQRbf8gbKw8KZQZAJWxH2|172200",
  song: "song/paul-cardall-jennas-dance",
} as const satisfies Track
