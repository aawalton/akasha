import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonBecauseOfYouRemixesBecauseOfYouOriginalMix = {
  id: "01a0a5ae-e544-7c53-897f-b47d1ab3ac1a",
  type: "page-type/track",
  slug: "kelly-clarkson-because-of-you-remixes-because-of-you-original-mix",
  ownLength: 3.6726666666666667,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-because-of-you-remixes"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3VZlRnmucKiGNs2CRZ2AP1",
      externalLink: "https://open.spotify.com/track/3VZlRnmucKiGNs2CRZ2AP1",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Because Of You (Original Mix)",
} as const satisfies Track
