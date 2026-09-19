import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ClassicalLoveRomanceYouAreTheReason = {
  id: "01a0afa1-d1f0-7f2f-99e1-380261e66f54",
  type: "page-type/track",
  slug: "the-piano-guys-3-classical-love-romance-you-are-the-reason",
  ownLength: 3.9205,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-classical-love-romance"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3VWrExAhooCiHKcvGeKnZy",
      externalLink: "https://open.spotify.com/track/3VWrExAhooCiHKcvGeKnZy",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "You Are The Reason",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
    { externalId: "5vvlfKQdn6amTImsjy9Si5", artistName: "Dallas String Quartet" },
  ],
  trackKey: "youarethereason|0jW6R8CVyVohuUJVcuweDI,5vvlfKQdn6amTImsjy9Si5|235230",
  song: "song/the-piano-guys-you-are-the-reason",
} as const satisfies Track
