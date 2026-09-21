import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallANewCreationWondersInHeaven = {
  id: "01a0b4c8-35e2-7b8e-8537-610668df608b",
  type: "page-type/track",
  slug: "paul-cardall-a-new-creation-wonders-in-heaven",
  ownLength: 4.2111,
  ownProgress: 4.2111,
  partOfCollections: ["release/paul-cardall-a-new-creation"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6dMieZZFdIMtiNLpnw3f04",
      externalLink: "https://open.spotify.com/track/6dMieZZFdIMtiNLpnw3f04",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Wonders in Heaven",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "wondersinheaven|7FQRbf8gbKw8KZQZAJWxH2|252666",
  song: "song/paul-cardall-wonders-in-heaven",
  carriedBy: [
    {
      release: "release/paul-cardall-a-new-creation",
      discNumber: 1,
      position: 4,
      externalId: "6dMieZZFdIMtiNLpnw3f04",
      externalLink: "https://open.spotify.com/track/6dMieZZFdIMtiNLpnw3f04",
    },
  ],
} as const satisfies Track
