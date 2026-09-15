import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonMyDecemberDontWasteYourTime = {
  id: "01a0a5ae-c9d8-7195-b025-8af0386a57e4",
  type: "page-type/track",
  slug: "kelly-clarkson-my-december-dont-waste-your-time",
  ownLength: 3.588216666666667,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-my-december"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "33XaLfS6lcitzafRtG2sVg",
      externalLink: "https://open.spotify.com/track/33XaLfS6lcitzafRtG2sVg",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Don't Waste Your Time",
} as const satisfies Track
