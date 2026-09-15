import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonThankfulBeautifulDisaster = {
  id: "01a0a5ae-cd41-73f4-8f06-60bd6f35fa35",
  type: "page-type/track",
  slug: "kelly-clarkson-thankful-beautiful-disaster",
  ownLength: 4.179766666666667,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-thankful"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6bcnBvXEsaqFxO5jkgwPwR",
      externalLink: "https://open.spotify.com/track/6bcnBvXEsaqFxO5jkgwPwR",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Beautiful Disaster",
} as const satisfies Track
