import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonThankfulTheTroubleWithLoveIs = {
  id: "01a0a5ae-cc91-7eca-957a-5fd1c39615cf",
  type: "page-type/track",
  slug: "kelly-clarkson-thankful-the-trouble-with-love-is",
  ownLength: 3.6851,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-thankful"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "09heXV6LYqcZ476eBU9mRQ",
      externalLink: "https://open.spotify.com/track/09heXV6LYqcZ476eBU9mRQ",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "The Trouble With Love Is",
} as const satisfies Track
