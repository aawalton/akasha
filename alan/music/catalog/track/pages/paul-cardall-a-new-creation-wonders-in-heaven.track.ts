import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallANewCreationWondersInHeaven = {
  id: "01a0b4c8-35e2-7b8e-8537-610668df608b",
  type: "page-type/track",
  slug: "paul-cardall-a-new-creation-wonders-in-heaven",
  ownLength: 4.2111,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-a-new-creation"],
  position: 4,
  status: "not-started",
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
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "wondersinheaven|7FQRbf8gbKw8KZQZAJWxH2|252666",
  song: "song/paul-cardall-wonders-in-heaven",
} as const satisfies Track
