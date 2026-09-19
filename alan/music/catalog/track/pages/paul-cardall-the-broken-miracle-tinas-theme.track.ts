import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheBrokenMiracleTinasTheme = {
  id: "01a0b4c8-30a8-7e75-b67b-23f9f83acebb",
  type: "page-type/track",
  slug: "paul-cardall-the-broken-miracle-tinas-theme",
  ownLength: 3.66155,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-broken-miracle"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6mWeUh9FaEEXy6rWaLYQh2",
      externalLink: "https://open.spotify.com/track/6mWeUh9FaEEXy6rWaLYQh2",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Tina’s Theme",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "tinastheme|7FQRbf8gbKw8KZQZAJWxH2|219693",
  song: "song/paul-cardall-tinas-theme",
} as const satisfies Track
