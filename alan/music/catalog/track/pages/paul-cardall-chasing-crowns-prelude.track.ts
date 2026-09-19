import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsPrelude = {
  id: "01a0b4c8-2092-7bdc-9cf7-91e1e09fdc86",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-prelude",
  ownLength: 1.25155,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3zzIsWTRGuq7iyzBIZlKoL",
      externalLink: "https://open.spotify.com/track/3zzIsWTRGuq7iyzBIZlKoL",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Prelude",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "prelude|7FQRbf8gbKw8KZQZAJWxH2|75093",
  song: "song/paul-cardall-prelude",
} as const satisfies Track
