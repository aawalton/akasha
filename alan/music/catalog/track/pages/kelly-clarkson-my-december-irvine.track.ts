import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonMyDecemberIrvine = {
  id: "01a0a5ae-cab1-76d1-b86a-9bd84387cd98",
  type: "track",
  slug: "kelly-clarkson-my-december-irvine",
  ownLength: 8.763766666666667,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-my-december"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0Fb4nlnX8gnLGC4OJxkwTY",
      externalLink: "https://open.spotify.com/track/0Fb4nlnX8gnLGC4OJxkwTY",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Irvine",
} as const satisfies Track
