import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ChillYouAreTheReason = {
  id: "01a0afa1-e1a5-7df4-be2e-3a350f798cca",
  type: "page-type/track",
  slug: "the-piano-guys-3-chill-you-are-the-reason",
  ownLength: 3.9205,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-chill"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "39kcQDf6iV6RG7sq2shJBk",
      externalLink: "https://open.spotify.com/track/39kcQDf6iV6RG7sq2shJBk",
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
