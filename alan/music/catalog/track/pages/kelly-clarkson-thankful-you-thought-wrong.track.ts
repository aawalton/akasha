import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonThankfulYouThoughtWrong = {
  id: "01a0a5ae-cd5c-7b31-9e7f-78c992462703",
  type: "track",
  slug: "kelly-clarkson-thankful-you-thought-wrong",
  ownLength: 3.832666666666667,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-thankful"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6rtczkcbMUTUpq0XaPUZW5",
      externalLink: "https://open.spotify.com/track/6rtczkcbMUTUpq0XaPUZW5",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "You Thought Wrong",
} as const satisfies Track
