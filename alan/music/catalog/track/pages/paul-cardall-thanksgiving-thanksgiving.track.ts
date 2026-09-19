import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallThanksgivingThanksgiving = {
  id: "01a0b4c8-698c-77a8-bc81-bc12b8d6ad50",
  type: "page-type/track",
  slug: "paul-cardall-thanksgiving-thanksgiving",
  ownLength: 2.35955,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-thanksgiving"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5XYHovggqmPIZsDzp9FT9F",
      externalLink: "https://open.spotify.com/track/5XYHovggqmPIZsDzp9FT9F",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Thanksgiving",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "thanksgiving|7FQRbf8gbKw8KZQZAJWxH2|141573",
  song: "song/paul-cardall-thanksgiving",
} as const satisfies Track
