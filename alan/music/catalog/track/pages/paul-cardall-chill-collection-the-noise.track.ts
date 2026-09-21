import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChillCollectionTheNoise = {
  id: "01a0b4c8-463b-7f35-b0ff-39b67919eed7",
  type: "page-type/track",
  slug: "paul-cardall-chill-collection-the-noise",
  ownLength: 5.3716333333333335,
  ownProgress: 5.3716333333333335,
  partOfCollections: ["release/paul-cardall-chill-collection"],
  status: "completed",
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
  carriedBy: [
    {
      release: "release/paul-cardall-chill-collection",
      discNumber: 1,
      position: 13,
      externalId: "3Nl1snmIZWnq08DofhpaKr",
      externalLink: "https://open.spotify.com/track/3Nl1snmIZWnq08DofhpaKr",
    },
  ],
} as const satisfies Track
