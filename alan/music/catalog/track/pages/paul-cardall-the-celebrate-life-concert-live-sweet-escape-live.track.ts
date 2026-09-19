import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheCelebrateLifeConcertLiveSweetEscapeLive = {
  id: "01a0b4c8-4359-709f-8241-3a702c932f0f",
  type: "page-type/track",
  slug: "paul-cardall-the-celebrate-life-concert-live-sweet-escape-live",
  ownLength: 3.1852,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-celebrate-life-concert-live"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7tNciXYhJ8cCJ39TNQIwwU",
      externalLink: "https://open.spotify.com/track/7tNciXYhJ8cCJ39TNQIwwU",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Sweet Escape - Live",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "sweetescapelive|7FQRbf8gbKw8KZQZAJWxH2|191112",
  song: "song/paul-cardall-sweet-escape",
} as const satisfies Track
