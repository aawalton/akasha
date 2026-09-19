import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenPassingTime = {
  id: "01a0b4c8-49d2-784a-beaf-32618a167ba0",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-passing-time",
  ownLength: 3.9771,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3e8GvZAiQt6sCjlOWDJhOf",
      externalLink: "https://open.spotify.com/track/3e8GvZAiQt6sCjlOWDJhOf",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Passing Time",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "passingtime|7FQRbf8gbKw8KZQZAJWxH2|238626",
  song: "song/paul-cardall-passing-time",
} as const satisfies Track
