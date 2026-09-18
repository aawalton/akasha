import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoTheGrowingSeason = {
  id: "01a0b4c8-3204-75eb-8d86-131acab33bc2",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-the-growing-season",
  ownLength: 4.654,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "55ukNZ9zHGdljRa7aIhipl",
      externalLink: "https://open.spotify.com/track/55ukNZ9zHGdljRa7aIhipl",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Growing Season",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "thegrowingseason|7FQRbf8gbKw8KZQZAJWxH2|279240",
} as const satisfies Track
