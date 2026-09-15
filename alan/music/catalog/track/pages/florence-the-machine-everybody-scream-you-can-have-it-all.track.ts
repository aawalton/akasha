import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const florenceTheMachineEverybodyScreamYouCanHaveItAll = {
  id: "01a0a5cd-4a79-7504-b0b2-71deec0bbdb2",
  type: "page-type/track",
  slug: "florence-the-machine-everybody-scream-you-can-have-it-all",
  ownLength: 3.99935,
  ownProgress: 0,
  partOfCollections: ["release/florence-the-machine-everybody-scream"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ZIXPNe0ZsLdUXlIHGNAdx",
      externalLink: "https://open.spotify.com/track/3ZIXPNe0ZsLdUXlIHGNAdx",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "You Can Have It All",
} as const satisfies Track
