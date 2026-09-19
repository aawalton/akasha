import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChillCollectionTheNoise = {
  id: "01a0b4c8-463b-7f35-b0ff-39b67919eed7",
  type: "page-type/track",
  slug: "paul-cardall-chill-collection-the-noise",
  ownLength: 5.3716333333333335,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-chill-collection"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3Nl1snmIZWnq08DofhpaKr",
      externalLink: "https://open.spotify.com/track/3Nl1snmIZWnq08DofhpaKr",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Noise",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "thenoise|7FQRbf8gbKw8KZQZAJWxH2|322298",
  song: "song/paul-cardall-the-noise",
} as const satisfies Track
