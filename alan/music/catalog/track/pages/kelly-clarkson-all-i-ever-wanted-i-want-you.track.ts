import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonAllIEverWantedIWantYou = {
  id: "01a0a5ae-c8fa-7892-8410-9bdc3ee76f7a",
  type: "page-type/track",
  slug: "kelly-clarkson-all-i-ever-wanted-i-want-you",
  ownLength: 3.5104333333333333,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-all-i-ever-wanted"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4AWHpoB0IIyYQSGVommXjN",
      externalLink: "https://open.spotify.com/track/4AWHpoB0IIyYQSGVommXjN",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "I Want You",
} as const satisfies Track
