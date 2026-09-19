import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NeverDieYoungLetterInTheMail = {
  id: "01a0abeb-418b-784f-a88f-487274c0147a",
  type: "page-type/track",
  slug: "james-taylor-2-never-die-young-letter-in-the-mail",
  ownLength: 4.68555,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-never-die-young"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1o2dvnqMGxeCQWw6MJRhn9",
      externalLink: "https://open.spotify.com/track/1o2dvnqMGxeCQWw6MJRhn9",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Letter in the Mail",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "letterinthemail|0vn7UBvSQECKJm2817Yf1P|281133",
  song: "song/james-taylor-letter-in-the-mail",
} as const satisfies Track
