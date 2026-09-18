import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallNewLifePassingTime = {
  id: "01a0b4c8-3fcc-7678-888d-bd90ae731370",
  type: "page-type/track",
  slug: "paul-cardall-new-life-passing-time",
  ownLength: 3.9937666666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-new-life"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4GnoTuKVMJqKg44XY9G6gp",
      externalLink: "https://open.spotify.com/track/4GnoTuKVMJqKg44XY9G6gp",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Passing Time",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "passingtime|7FQRbf8gbKw8KZQZAJWxH2|239626",
} as const satisfies Track
