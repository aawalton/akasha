import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallAncestorsHeartsOfMothers = {
  id: "01a0b4c8-1ea9-7b54-8122-c3f809497245",
  type: "page-type/track",
  slug: "paul-cardall-ancestors-hearts-of-mothers",
  ownLength: 3.3223,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-ancestors"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4047I6yARvsP9jhEjLcf2W",
      externalLink: "https://open.spotify.com/track/4047I6yARvsP9jhEjLcf2W",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Hearts of Mothers",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "heartsofmothers|7FQRbf8gbKw8KZQZAJWxH2|199338",
} as const satisfies Track
