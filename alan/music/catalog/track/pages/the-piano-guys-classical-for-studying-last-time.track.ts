import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysClassicalForStudyingLastTime = {
  id: "01a0afa1-c9ef-78e1-a0fc-11418c7213c5",
  type: "page-type/track",
  slug: "the-piano-guys-classical-for-studying-last-time",
  ownLength: 3.1416666666666666,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-classical-for-studying"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1dflLSbY53IcGQWEnL4Zy1",
      externalLink: "https://open.spotify.com/track/1dflLSbY53IcGQWEnL4Zy1",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Last Time",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "lasttime|0jW6R8CVyVohuUJVcuweDI|188500",
  song: "song/the-piano-guys-last-time",
} as const satisfies Track
