import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonStrongerDeluxeVersionYouLoveMe = {
  id: "01a0a5ae-c2bc-7798-abd1-69ffd6ecd76e",
  type: "page-type/track",
  slug: "kelly-clarkson-stronger-deluxe-version-you-love-me",
  ownLength: 4.07,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-stronger-deluxe-version"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5ixRgMRAyYSdPonq8qrrWr",
      externalLink: "https://open.spotify.com/track/5ixRgMRAyYSdPonq8qrrWr",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "You Love Me",
} as const satisfies Track
