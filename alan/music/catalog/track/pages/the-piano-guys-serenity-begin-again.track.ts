import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysSerenityBeginAgain = {
  id: "01a0afa2-0938-7e6c-85df-91c2f3bad280",
  type: "page-type/track",
  slug: "the-piano-guys-serenity-begin-again",
  ownLength: 4.1331,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-serenity"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4ADYtCeB7Fi4OLQ3bFLpHg",
      externalLink: "https://open.spotify.com/track/4ADYtCeB7Fi4OLQ3bFLpHg",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Begin Again",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "beginagain|0jW6R8CVyVohuUJVcuweDI|247986",
} as const satisfies Track
