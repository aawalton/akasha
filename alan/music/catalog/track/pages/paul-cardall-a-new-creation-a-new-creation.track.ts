import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallANewCreationANewCreation = {
  id: "01a0b4c8-3570-7b91-a18f-67821ab35388",
  type: "page-type/track",
  slug: "paul-cardall-a-new-creation-a-new-creation",
  ownLength: 4.33465,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-a-new-creation"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2S9HnFLlPJzLuqIFlqIRCa",
      externalLink: "https://open.spotify.com/track/2S9HnFLlPJzLuqIFlqIRCa",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "A New Creation",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "anewcreation|7FQRbf8gbKw8KZQZAJWxH2|260079",
  song: "song/paul-cardall-a-new-creation",
} as const satisfies Track
