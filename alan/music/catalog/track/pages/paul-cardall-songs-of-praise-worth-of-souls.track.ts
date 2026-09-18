import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSongsOfPraiseWorthOfSouls = {
  id: "01a0b4c8-5170-77d4-9006-dcedf410b672",
  type: "page-type/track",
  slug: "paul-cardall-songs-of-praise-worth-of-souls",
  ownLength: 4.382883333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-songs-of-praise"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3t1XKqfufpfKjVglmCeYpn",
      externalLink: "https://open.spotify.com/track/3t1XKqfufpfKjVglmCeYpn",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Worth of Souls",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "worthofsouls|7FQRbf8gbKw8KZQZAJWxH2|262973",
} as const satisfies Track
