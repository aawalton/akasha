import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallMarySLamentMarysLament = {
  id: "01a0b4c8-6773-7f2b-89fe-76b72b224bee",
  type: "page-type/track",
  slug: "paul-cardall-mary-s-lament-marys-lament",
  ownLength: 5.118233333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-mary-s-lament"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1c0qW5ZeDyKno7IgL5F5zI",
      externalLink: "https://open.spotify.com/track/1c0qW5ZeDyKno7IgL5F5zI",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Mary's Lament",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "maryslament|7FQRbf8gbKw8KZQZAJWxH2|307094",
  song: "song/paul-cardall-marys-lament",
} as const satisfies Track
