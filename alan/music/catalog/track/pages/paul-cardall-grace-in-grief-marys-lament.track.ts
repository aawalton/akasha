import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallGraceInGriefMarysLament = {
  id: "01a0b4c8-2519-7965-bbb3-514ffe6bf365",
  type: "page-type/track",
  slug: "paul-cardall-grace-in-grief-marys-lament",
  ownLength: 5.118233333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-grace-in-grief"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2etUNQOl7WhVmbh9ZPiUxo",
      externalLink: "https://open.spotify.com/track/2etUNQOl7WhVmbh9ZPiUxo",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Mary's Lament",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "maryslament|7FQRbf8gbKw8KZQZAJWxH2|307094",
  song: "song/paul-cardall-marys-lament",
} as const satisfies Track
