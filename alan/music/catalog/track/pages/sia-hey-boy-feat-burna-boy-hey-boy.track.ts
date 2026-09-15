import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaHeyBoyFeatBurnaBoyHeyBoy = {
  id: "01a0a59c-2d36-7541-a57f-20573cf3f659",
  type: "track",
  slug: "sia-hey-boy-feat-burna-boy-hey-boy",
  ownLength: 2.49115,
  ownProgress: 0,
  partOfCollections: ["release/sia-hey-boy-feat-burna-boy"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Bpx3cOwgnGI6PLq1gGwKL",
      externalLink: "https://open.spotify.com/track/1Bpx3cOwgnGI6PLq1gGwKL",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Hey Boy",
} as const satisfies Track
