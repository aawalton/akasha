import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenAlongTheWasatch = {
  id: "01a0b4c8-4b9a-786f-8e54-0e1b723f48ec",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-along-the-wasatch",
  ownLength: 3.404,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  position: 18,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5iM0a00B40fjS51dtTmXHt",
      externalLink: "https://open.spotify.com/track/5iM0a00B40fjS51dtTmXHt",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Along The Wasatch",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "alongthewasatch|7FQRbf8gbKw8KZQZAJWxH2|204240",
  song: "song/paul-cardall-along-the-wasatch",
} as const satisfies Track
