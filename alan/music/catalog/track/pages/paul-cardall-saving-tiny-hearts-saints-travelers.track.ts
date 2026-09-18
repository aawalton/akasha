import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSavingTinyHeartsSaintsTravelers = {
  id: "01a0b4c8-3dab-72ed-8740-8f432633f9fe",
  type: "page-type/track",
  slug: "paul-cardall-saving-tiny-hearts-saints-travelers",
  ownLength: 1.5631,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-saving-tiny-hearts"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7J1ZqyD9jZmQlS6XVT32uw",
      externalLink: "https://open.spotify.com/track/7J1ZqyD9jZmQlS6XVT32uw",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Saints & Travelers",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "saintstravelers|7FQRbf8gbKw8KZQZAJWxH2|93786",
} as const satisfies Track
