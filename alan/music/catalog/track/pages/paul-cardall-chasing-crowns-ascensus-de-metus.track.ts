import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsAscensusDeMetus = {
  id: "01a0b4c8-2126-761a-99df-3f17384455d6",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-ascensus-de-metus",
  ownLength: 4.091666666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "36NapoqzBL6F37PDkvPlEN",
      externalLink: "https://open.spotify.com/track/36NapoqzBL6F37PDkvPlEN",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Ascensus de Metus",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "ascensusdemetus|7FQRbf8gbKw8KZQZAJWxH2|245500",
} as const satisfies Track
