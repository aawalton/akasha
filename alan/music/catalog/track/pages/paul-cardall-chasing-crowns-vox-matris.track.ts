import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsVoxMatris = {
  id: "01a0b4c8-2267-7701-acc8-30d07eb4fd09",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-vox-matris",
  ownLength: 3.4,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6nOU97dwMTIdACrvQxF0DI",
      externalLink: "https://open.spotify.com/track/6nOU97dwMTIdACrvQxF0DI",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Vox Matris",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "voxmatris|7FQRbf8gbKw8KZQZAJWxH2|204000",
  song: "song/paul-cardall-vox-matris",
} as const satisfies Track
