import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonThankfulJustMissedTheTrain = {
  id: "01a0a5ae-cd27-7c73-af18-d425c9370a3e",
  type: "page-type/track",
  slug: "kelly-clarkson-thankful-just-missed-the-train",
  ownLength: 4.175333333333334,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-thankful"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5tHhzwooezatUFA0jZ9aC1",
      externalLink: "https://open.spotify.com/track/5tHhzwooezatUFA0jZ9aC1",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Just Missed The Train",
} as const satisfies Track
