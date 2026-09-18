import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallMourningLightMourningLight = {
  id: "01a0b4c8-6794-74ba-aa01-bf0cdf706d8c",
  type: "page-type/track",
  slug: "paul-cardall-mourning-light-mourning-light",
  ownLength: 3.85,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-mourning-light"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1gCWCSVLsvJAK79Srw7FX7",
      externalLink: "https://open.spotify.com/track/1gCWCSVLsvJAK79Srw7FX7",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Mourning Light",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "mourninglight|7FQRbf8gbKw8KZQZAJWxH2|231000",
} as const satisfies Track
