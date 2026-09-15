import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonTakeYouHighTakeYouHigh = {
  id: "01a0a5ae-dcaf-76a5-9769-8ccf3a28fcf2",
  type: "track",
  slug: "kelly-clarkson-take-you-high-take-you-high",
  ownLength: 4.3368166666666665,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-take-you-high"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6UEAYtniMI9fbJOtVFtBaD",
      externalLink: "https://open.spotify.com/track/6UEAYtniMI9fbJOtVFtBaD",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Take You High",
} as const satisfies Track
