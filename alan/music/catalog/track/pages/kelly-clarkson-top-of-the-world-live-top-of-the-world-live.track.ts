import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonTopOfTheWorldLiveTopOfTheWorldLive = {
  id: "01a0a5ae-db7a-784a-a211-90320aa3bb29",
  type: "page-type/track",
  slug: "kelly-clarkson-top-of-the-world-live-top-of-the-world-live",
  ownLength: 5.272716666666667,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-top-of-the-world-live"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3wc8leV5uCtEHdbGRmNlaG",
      externalLink: "https://open.spotify.com/track/3wc8leV5uCtEHdbGRmNlaG",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Top of the World - Live",
} as const satisfies Track
